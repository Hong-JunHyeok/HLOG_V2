const startWithURL = (path: string) => {
  if (!path) return null;
  const URL = process.env.API_SERVER_URL;

  return `${URL}/${path}`;
};

export default startWithURL;
