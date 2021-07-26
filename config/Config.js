module.exports = {
  auth: {
    username: process.env.APP_USERNAME || "",
    password: process.env.APP_PASSWORD || "",
  },
  service: {
    environment: process.env.NODE_ENV || "DEV",
  },
  db: {
    url: process.env.DB_URI || "mongodb://localhost/staff_log_db",
  },
};
