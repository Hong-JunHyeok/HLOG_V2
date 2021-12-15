require("dotenv").config();

module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  encoding: "utf8",
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci",
  synchronize: true,
  logging: process.env.NODE_ENV === "development" ? true : false,
  entities: ["entity/**/*.ts"],
  migrations: ["migration/**/*.ts"],
  subscribers: ["subscriber/**/*.ts"],

  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration",
    subscribersDir: "subscriber",
  },
};
