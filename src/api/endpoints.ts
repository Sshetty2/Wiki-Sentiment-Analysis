/* eslint-disable max-len */
export const generateSearchUrl = (value: string) => `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(value)}&prop=info&inprop=url&format=json&origin=*`;

export const generateAnalyzeTextUrl = (serviceUrl: string) => `${serviceUrl}/v1/analyze?version=2021-08-01`;

export const generateRawWikiPageDataUrlWithPageId = (pageId: number) => `https://en.wikipedia.org/w/index.php?curid=${pageId}&action=raw`;

export const generateRawWikiPageDataUrlWithPageTitle = (pageTitle: string) => {
  const formattedTitle = pageTitle.replace(/\s+/g, '_');

  return `https://en.wikipedia.org/w/index.php?title=${formattedTitle}&action=raw`;
};
