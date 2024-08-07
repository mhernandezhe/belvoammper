// ./components/api.js
import axios from 'axios';

const BASE_URL = 'https://sandbox.belvo.com/api'; // Reemplaza con tu URL base
const API_TOKEN = '848db9af-c89a-40e9-afcd-c599b438a65e:DqgFcXMIQ7Z7cBu#Po#6yUgD7aqn9y_NlAulP_X6hhyk9rAw1EtAj_NF3yYp@Nf2'; // Reemplaza con tu token

export const fetchTransactions = async () => {
  let transactions = [];
  let nextPageUrl = `${BASE_URL}/transactions/`; // URL inicial de la API
  let page = 1; // Comenzamos con la primera página
  let requestCount = 0; // Contador de solicitudes

  try {
    while (nextPageUrl && requestCount < 10) { // Añadido límite de solicitudes
      const config = {
        method: 'get',
        url: nextPageUrl,
        params: {
          page: page,
          link: "61471984-bf6d-43c6-a5d9-08364ed86ede" // Reemplaza con el valor adecuado si es necesario
        },
        headers: {
          Authorization: `Basic ${btoa(API_TOKEN)}` // Codifica el token en base64 para Basic Auth
        }
      };

      const response = await axios.request(config);
      transactions = transactions.concat(response.data.results || response.data.transactions);

      // Actualiza la URL para la siguiente página
      nextPageUrl = response.data.next || null;
      
      // Incrementa el número de la página
      page++;
      
      // Incrementa el contador de solicitudes
      requestCount++;
    }

    console.log('Fetched transactions:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
