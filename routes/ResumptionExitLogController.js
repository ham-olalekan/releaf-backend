const express = require("express");
const router = express.Router();
const log = require("../middleware/request-log");
const LogService = require("../service/LogService");
const StaffService = require("../service/StaffService");

router.get("/:staffId", log, async (req, res) => {
  const staffId = req.params.staffId;

  const staffInfo = await StaffService.findStaffById(staffId);

  if (!staffInfo || Object.keys(staffInfo).length == 0) {
    return res.status(404).send({
      status: true,
      message: `Invalid staff Id: ${staffId}`,
      data: null,
    });
  }

  try {
    LogService.getTodayLog(staffId).then((log) => {
      if (!log || Object.keys(log).length == 0) {
        return res.status(404).send({
          status: false,
          message: "No log found today",
          data: null,
        });
      }

      return res.status(200).send({
        status: true,
        message: "log fetched successfully",
        data: log,
      });
    });
  } catch (err) {
    console.log("error fetching log : ", err);
    return res.status(400).send({
      status: true,
      message: "failed to fetch log",
      data: log,
    });
  }
});

router.post("/check-in/:staffId", log, async (req, res) => {
  const staffId = req.params.staffId;

  const staffInfo = await StaffService.findStaffById(staffId);

  if (!staffInfo || Object.keys(staffInfo).length == 0) {
    return res.status(404).send({
      status: true,
      message: `Invalid staff Id: ${staffId}`,
      data: null,
    });
  }

  try {
    let checkinResponse = await LogService.checkInStaff(staffId);
    return res.status(200).send({
      status: true,
      message: "check-in successful",
      data: checkinResponse,
    });
  } catch (err) {
    console.log("error checking in staff  : ", err);
    return res.status(400).send({
      status: true,
      message: err,
      data: null,
    });
  }
});

router.put("/check-out/:staffId", log, async (req, res) => {
  const staffId = req.params.staffId;

  const staffInfo = await StaffService.findStaffById(staffId);

  if (!staffInfo || Object.keys(staffInfo).length == 0) {
    return res.status(404).send({
      status: true,
      message: `Invalid staff Id: ${staffId}`,
      data: null,
    });
  }

  try {
    let checkoutResponse = await LogService.checkOutStaff(staffId);
      return res.status(200).send({
        status: true,
        message: "checkout successful",
        data: checkoutResponse,
      });
  } catch (err) {
    console.log("error checkin out staff  : ", err);
    return res.status(400).send({
      status: true,
      message: err,
      data: null,
    });
  }
});

module.exports = router;
