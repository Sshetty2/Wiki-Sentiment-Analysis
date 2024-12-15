import { IBM_NLU_LAMBDA_URL } from './endpoints';

export const analyzeTextViaLambda = async (text: string) => {
  try {
    const response = await fetch(IBM_NLU_LAMBDA_URL, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
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
