/* eslint-disable max-len */
export const generateSearchUrl = (value: string) => `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(value)}&prop=info&inprop=url&format=json&origin=*`;

export const IBM_NLU_LAMBDA_URL = 'https://qc12p9pmq1.execute-api.us-east-1.amazonaws.com/prod/ibm-nlu';

export const WIKI_DATA_LAMBDA_URL = 'https://qc12p9pmq1.execute-api.us-east-1.amazonaws.com/prod/wiki-data';
