// ./components/api.js
import axios from 'axios';

const BASE_URL = 'https://sandbox.belvo.com/api'; // Reemplaza con tu URL base
const API_TOKEN = '848db9af-c89a-40e9-afcd-c599b438a65e:DqgFcXMIQ7Z7cBu#Po#6yUgD7aqn9y_NlAulP_X6hhyk9rAw1EtAj_NF3yYp@Nf2'; // Reemplaza con tu token

export const fetchTransactions = async () => {
  try {
    const config = {
      method: 'get',
      url: `${BASE_URL}/transactions/`, // Cambiado a 'transactions/' para la solicitud requerida
      params: {
        page: 1,
        link: "61471984-bf6d-43c6-a5d9-08364ed86ede"
      },
      headers: {
        Authorization: `Basic ${btoa(API_TOKEN)}` // Codifica el token en base64 para Basic Auth
      }
    };

    const response = await axios.request(config);
    //console.log('Fetched transactions:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};