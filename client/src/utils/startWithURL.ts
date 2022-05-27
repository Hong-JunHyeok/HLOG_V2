const startWithURL = (path: string) => {
  const URL = process.env.API_SERVER_URL;

  return `${URL}/${path}`;
};

export default startWithURL;
