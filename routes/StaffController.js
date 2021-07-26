const express = require("express");
const router = express.Router();
const log = require("../middleware/request-log");
const { validate } = require("../validator/StaffValidator");
const StaffService = require("../service/StaffService");

router.post("/create", log, async (req, res) => {
  //validate payload
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send({
      status: false,
      message: error.details[0].message,
      data: null,
    });
  }

  StaffService.createNewStaff(req.body)
    .then((createdStaff) => {
      return res.status(201).send({
        status: true,
        message: "staff creation successful",
        data: createdStaff,
      });
    })
    .catch((err) => {
      console.log(`error occurred while creating new staff record: `, err);
      return res.status(500).send({
        status: false,
        message: "internal server error",
        data: null,
      });
    });
});

router.get("/:staffId", log, async (req, res) => {
  const staffId = req.params.staffId;
  
  const staffInfo = await StaffService.findStaffById(staffId);
  if (!staffInfo || (Object.keys(staffInfo).length == 0)) {
    return res.status(404).send({
      status: true,
      message: `Invalid staff Id: ${staffId}`,
      data: null,
    });
  }

  return res.status(200).send({
    status: true,
    message: "successful",
    data: staffInfo,
  });
});

router.post("/:staffId", log, async (req, res) => {
  const staffId = req.params.staffId;
  const payload = req.body;
  const staffInfo = await StaffService.findStaffById(staffId);
  if (!staffInfo) {
    return res.status(404).send(`Invalid staff Id: ${staffId}`);
  }

  let updatedInfo = await StaffService.updateStaffInfo(staffId, payload);

  return res.status(200).send({
    status: true,
    message: "staff info updated successfully",
    data: updatedInfo,
  });
});

module.exports = router;
