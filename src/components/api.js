import axios from 'axios';

const BASE_URL = 'https://api.belvo.com';
const REACT_APP_BELVO_CLIENT_ID= '7d7af145-eb77-46b5-98de-b0f31c6780f4';
const REACT_APP_BELVO_CLIENT_SECRET= 'Xaj-ri957J3wnBgHlX_NA*tt*t_6z38V4gMhDqHAbHyy65i_DPMTxdxTtMlI9v*4'

export const getTransactions = async () => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    headers: {
      'Authorization': `Bearer ${REACT_APP_BELVO_CLIENT_ID}:${REACT_APP_BELVO_CLIENT_SECRET}`
    }
  });
  return response.data;
};