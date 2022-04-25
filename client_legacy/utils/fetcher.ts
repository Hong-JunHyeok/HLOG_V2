import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;
const fetcher = (url: string) => axios.get(url).then(res => res.data.payload);

export default fetcher;
