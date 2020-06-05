import React from 'react'; // so that we can use JSX syntax
import { render, cleanup, waitForElement } from '@testing-library/react'; // testing helpers
import 'jest-dom/extend-expect'; // to extend Jest's expect with DOM assertions
import nock from 'nock'; // to mock github API
import App from 'ui/App'; // the app that we are going to test
import { ENDPOINTS } from 'domain/configuration';
import { localisedStrings } from 'lib/localisation';
import { Horse } from 'domain/horses/types';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

const HORSE_LIST: Horse[] = [
  {
    id: 'ad5c5173-b9e7-4e90-a406-0385e88df41e',
    name: 'Thunderdash fake',
    profile: {
      favouriteFood: 'Hot Chips',
      physical: { height: 200, weight: 450 },
    },
  },
  {
    id: 'f8da13b6-6588-48ef-a8d7-dd088d9abfc2',
    name: 'Artax',
    profile: {
      favouriteFood: 'Carrots',
      physical: { height: 198.99, weight: 400 },
    },
  },
  {
    id: '40c03fe9-e690-4a1b-821e-8bf65e18a168',
    name: 'Potoooooooo',
    profile: {
      favouriteFood: 'Potatoes',
      physical: { height: 205.44, weight: 423.44 },
    },
  },
  {
    id: '507b7716-2894-4fa9-8cf7-205f839f8a1f',
    name: 'Shorty',
    profile: {
      favouriteFood: 'Kebabs',
      physical: { height: 180.66, weight: 500.23 },
    },
  },
];

const endpoint = String(process.env.REACT_APP_API_ENDPOINT || 'Underfined');

const mockStore = configureStore();

describe('Domain/Horses', () => {
  beforeAll(() => {
    nock.disableNetConnect();
    console.log(`Endpoint: ${endpoint}`); // eslint-disable-line
    nock(endpoint)
      .persist()
      .log(console.log) // eslint-disable-line
      .get(ENDPOINTS.horses)
      .query(true)
      .reply(
        200,
        function (uri, requestBody) {
          return HORSE_LIST;
        },
        { 'Access-Control-Allow-Origin': '*' }
      );
  });

  afterAll(() => {
    console.log(`All nock urls used: ${nock.isDone()}`); // eslint-disable-line
    nock.cleanAll();
    nock.enableNetConnect();
    cleanup();
  });

  const { getByText } = render(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );

  describe('when there is a list of horses', () => {
    it('should show the horse list page title', async () => {
      getByText(localisedStrings.horseListTitle);
    });

    it('should show the names of the horses', async () => {
      await waitForElement(() =>
        HORSE_LIST.reduce((elementsToWaitFor: HTMLElement[], horse: Horse) => {
          elementsToWaitFor.push(getByText(horse.name));
          return elementsToWaitFor;
        }, [])
      );
    });
  });
});
