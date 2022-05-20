import axios from 'axios';

const AxiosConfigure = {
  baseURL: process.env.API_SERVER_URL,
  timeout: 1000,
}

export default axios.create(AxiosConfigure)
