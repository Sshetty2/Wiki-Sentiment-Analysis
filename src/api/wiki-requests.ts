import { WikiResponse } from '../types/WikiTypes';
import {
  generateRawWikiPageDataUrlWithPageId,
  generateRawWikiPageDataUrlWithPageTitle,
  generateSearchUrl
} from './endpoints';

const fetchAndReturnJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json() as T;

  return data;
};

const fetchAndReturnText = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const text = await response.text();

  return text;
};

export const fetchRawWikiPageDataWithPageId = async (pageId: number) => {
  const url = generateRawWikiPageDataUrlWithPageId(pageId);
  const text = await fetchAndReturnText(url);

  return text;
};

export const fetchRawWikiPageDataWithPageTitle = async (pageTitle: string) => {
  const url = generateRawWikiPageDataUrlWithPageTitle(pageTitle);
  const text = await fetchAndReturnText(url);

  return text;
};

export const fetchWikiResultsWithSearchText = async (searchText: string) => {
  const url = generateSearchUrl(searchText);
  const data = await fetchAndReturnJson<WikiResponse>(url);

  return data;
};
