/* eslint-disable @typescript-eslint/no-require-imports */
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version      : '2021-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_NLU_API_KEY
  }),
  serviceUrl: process.env.IBM_NLU_SERVICE_URL
});

exports.handler = async event => {
  try {
    const text = event.text;

    if (!text) {
      return {
        statusCode: 400,
        body      : JSON.stringify({ error: 'Text is required for analysis.' })
      };
    }

    const response = await naturalLanguageUnderstanding.analyze({
      text,
      features: {
        emotion: {
          document: true
        }
      }
    });

    return {
      statusCode: 200,
      body      : JSON.stringify(response.result)
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body      : JSON.stringify({ error: 'Failed to analyze text.' })
    };
  }
};
