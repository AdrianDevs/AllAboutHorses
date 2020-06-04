import { AxiosResponse, AxiosError, AxiosInstance } from 'axios';

export interface ApiErrorData {
  status: number;
  type: string;
  title: string;
  details: string;
}

export type ApiErrorResponse = AxiosResponse<ApiErrorData>;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const parseAxiosRequest = <TResult, TPayload>(
  method: HTTPMethod,
  endpoint: string,
  payload: TPayload,
  axiosInstance: AxiosInstance
) => {
  switch (method) {
    case 'POST':
      return axiosInstance.post<TResult>(endpoint, payload);
    case 'PUT':
      return axiosInstance.post<TResult>(endpoint, payload);
    case 'PATCH':
      return axiosInstance.post<TResult>(endpoint, payload);
    case 'DELETE':
      return axiosInstance.post<TResult>(endpoint, payload);
    default:
      return axiosInstance.get<TResult>(endpoint);
  }
};

// Conditional Types: https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types
type RequestFn<TPayload, TNewResult> = TPayload extends void
  ? () => Promise<TNewResult>
  : (payload: TPayload) => Promise<TNewResult>;

export interface RequestConfig<
  TPayload = any, // eslint-disable-line
  TResult = any, // eslint-disable-line
  TNewPayload = TPayload,
  TNewResult = TResult
> {
  transformPayload?: (payload: TPayload) => TNewPayload;
  transformResult?: (result: TResult, payload: TNewPayload) => TNewResult;
  transformEndpoint?: (payload: TNewPayload, endpoint: string) => string;
}

/**
 * Create a request function with the given HTTPVerb, endpoint and optional config
 *
 * @param method - HTTP Method ("GET", "POST", "PUT", "DELETE", "PATCH")
 */
export const request = (method: HTTPMethod, axiosInstance: AxiosInstance) => <
  TResult = any, // eslint-disable-line
  TPayload = void,
  TNewResult = TResult,
  TNewPayload = TPayload
>(
  endpoint: string,
  config?: RequestConfig<TPayload, TResult, TNewPayload, TNewResult>
): RequestFn<TPayload, TNewResult> => {
  /**
   * Fires an http request and returns a promise of type T or an Error
   * @param payload
   */
  async function requestFn(payload: TPayload): Promise<TNewResult> {
    // https://oprea.rocks/blog/what-do-the-three-dots-mean-in-javascript/
    const $config = {
      transformPayload: (p: TPayload) => p,
      transformResult: (result: TResult) => result,
      transformEndpoint: (_: TNewPayload, oldEndpoint: string) => oldEndpoint,
      ...(config || {}),
    };

    const $payload = $config.transformPayload(payload) as TNewPayload;
    const $endpoint = $config.transformEndpoint($payload, endpoint);

    try {
      const axiosRequest = parseAxiosRequest<TResult, TNewPayload>(
        method,
        $endpoint,
        $payload,
        axiosInstance
      );

      const $response: AxiosResponse<TResult> = await axiosRequest;

      return $config.transformResult($response.data, $payload) as TNewResult;
    } catch (error) {
      if (error.isAxiosError) {
        const axiosError: AxiosError<ApiErrorData> = error;

        throw axiosError.response ? axiosError.response : axiosError;
      }

      throw error;
    }
  }

  return requestFn as RequestFn<TPayload, TNewResult>;
};

export default function createClient(axiosInstance: AxiosInstance) {
  return {
    get: request('GET', axiosInstance),
    post: request('POST', axiosInstance),
    put: request('PUT', axiosInstance),
    patch: request('PATCH', axiosInstance),
    remove: request('DELETE', axiosInstance),
  };
}
