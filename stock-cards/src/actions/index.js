import axios from 'axios';

const API_KEY = 'ILFTJ1P130K0UMMN';
const FUNCTION = 'TIME_SERIES_INTRADAY';
const INTERVAL = '15min';
const SIZE = 'full';
const ROOT_URL = `https://www.alphavantage.co/query?function=${FUNCTION}&interval=${INTERVAL}&outputsize=${SIZE}&apikey=${API_KEY}`;

export const FETCH_STOCK = 'FETCH_STOCK';

export function fetchStock(symbol) {
  const url = `${ROOT_URL}&symbol=${symbol}`;
  const request = axios.get(url);
  console.log(request);
  
  return {
    type: FETCH_STOCK,
    payload: request
  };
}