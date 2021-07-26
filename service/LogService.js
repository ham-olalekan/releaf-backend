const { ResumptionExitLog } = require("../model/ResumptionExitLog");
const StaffService = require("../service/StaffService");
const moment = require("moment");

const checkInStaff = async (staffId) => {
  let staff = StaffService.findStaffById(staffId);

  if (!staff) {
    throw new Error(`Invalid staffId: ${staffId}`);
  }

  let log = await getTodayLog(staffId);

  if (log) {
    throw new Error("You have already clocked in today!!!");
  }

  let isLateResumption = getResumptionTime > new Date();
  let dailyLog = new ResumptionExitLog({
    staffId,
    isLateResumption,
  });

  return dailyLog.save();
};

const checkOutStaff = async (staffId) => {
  let checkOutTime = new Date();

  let log = await getTodayLog(staffId);
  if (!log || Object.keys(log).length == 0) {
    throw new Error("You didn't clock in today!!! you can't clock out");
  }

  if (log.checkOutTime) {
    throw new Error(
      "You have already clocked out today!!! you can only clock out once"
    );
  }

  let isEarlyExist = getClosingTime() > checkOutTime;

  log.isEarlyExist = isEarlyExist;
  log.checkOutTime = checkOutTime;
  await ResumptionExitLog.findByIdAndUpdate(log._id, log);

  return log;
};

const getTodayLog = (staffId) => {
  let now = moment();
  let sod = getStartOfDay(now);
  let eod = getEndOfDay(now);

  let log = ResumptionExitLog.findOne({
    staffId: staffId,
    checkInTime: {
      $gte: sod,
      $lte: eod,
    },
  });
  return log;
};

const getResumptionTime = () => {
  const d = new Date();
  d.setHours(8);
  d.setMinutes(0);
  d.setSeconds(0);
  return d.getTime();
};

const getClosingTime = () => {
  let date = moment();
  date.set({
    hour: 17,
    minute: 0,
    second: 0,
  });
};

const getStartOfDay = (today) => {
  return today.startOf("day").toString();
};

const getEndOfDay = (today) => {
  return today.endOf("day").toString();
};

exports.checkInStaff = checkInStaff;
exports.checkOutStaff = checkOutStaff;
exports.getTodayLog = getTodayLog;
