// eslint-disable-next-line @typescript-eslint/no-require-imports
const https = require('https');

exports.handler = async event => {
  try {
    const { title, pageId } = event;

    if (title === undefined && pageId === undefined) {
      return {
        statusCode: 400,
        headers   : { 'Access-Control-Allow-Origin': '*' },
        body      : JSON.stringify({ error: 'Error fetching article' })
      };
    }

    let wikiApiUrl = '';

    if (pageId) {
      wikiApiUrl = `https://en.wikipedia.org/w/index.php?curid=${pageId}&action=raw`;
    } else {
      wikiApiUrl = `https://en.wikipedia.org/w/index.php?title=${title}&action=raw`;
    }

    const articleContent = await new Promise((resolve, reject) => {
      https.get(wikiApiUrl, res => {
        let data = '';
        // eslint-disable-next-line no-return-assign
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', err => reject(err));
    });

    return {
      statusCode: 200,
      headers   : {
        'Access-Control-Allow-Origin' : '*', // CORS header
        'Access-Control-Allow-Methods': 'GET, OPTIONS' // CORS header
      },
      body: JSON.stringify({ content: articleContent })
    };
  } catch (error) {
    console.error('Error fetching article:', error);

    return {
      statusCode: 500,
      headers   : { 'Access-Control-Allow-Origin': '*' },
      body      : JSON.stringify({ error: 'Failed to fetch article' })
    };
  }
};
