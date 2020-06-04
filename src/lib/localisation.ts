import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import en from '../assets/locales/en';

export interface ILocalisedStrings extends LocalizedStringsMethods {
  horseListTitle: string;
  horseListSubtitle: string;
}

export const localisedStrings: ILocalisedStrings = new LocalizedStrings({
  en,
});
