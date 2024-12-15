export interface WikiResponse {
    batchcomplete: string;
    continue: Continue;
    query: Query;
}

export interface Continue {
    gsroffset: number;
    continue: string;
}

export interface Query {
    pages: { [key: string]: Page };
}

export interface Page {
    pageid: number;
    ns: number;
    title: string;
    index: number;
    contentmodel: Contentmodel;
    pagelanguage: Pagelanguage;
    pagelanguagehtmlcode: Pagelanguage;
    pagelanguagedir: Pagelanguagedir;
    touched: Date;
    lastrevid: number;
    length: number;
    fullurl: string;
    editurl: string;
    canonicalurl: string;
}

export enum Contentmodel {
    Wikitext = 'wikitext',
}

export enum Pagelanguage {
    En = 'en',
}

export enum Pagelanguagedir {
    LTR = 'ltr',
}

export interface WikiSuggestion {
    title: string;
    pageId: number;
    url?: string;
  }
