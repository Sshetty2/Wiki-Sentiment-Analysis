import { WikiResponse } from '../types/WikiTypes';
import {
  generateSearchUrl,
  WIKI_DATA_LAMBDA_URL
} from './endpoints';

const fetchAndReturnJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json() as T;

  return data;
};

export const fetchWikiResultsWithSearchText = async (searchText: string) => {
  const url = generateSearchUrl(searchText);
  const data = await fetchAndReturnJson<WikiResponse>(url);

  return data;
};

export const fetchWikiDataViaLambda = async (title: string, pageId?: string) => {
  try {
    const response = await fetch(WIKI_DATA_LAMBDA_URL, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        pageId
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    const body = await JSON.parse(data.body);

    if (data.statusCode === 200) {
      return body;
    }

    throw new Error(`Error: ${data.statusCode}`);
  } catch (error) {
    console.error('Error calling Lambda API:', error);
    throw error;
  }
};
