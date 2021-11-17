import app from "./";

const server = app.listen(app.get("PORT"), () => {
  console.log(`HLOG_V2 API Server is running at ${app.get("PORT")}`);
});

export default server;
