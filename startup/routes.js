const express = require("express");
const staffController = require("../routes/StaffController");
const LogController = require("../routes/ResumptionExitLogController");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/staff", staffController);
  app.use("/api/log", LogController);
};
