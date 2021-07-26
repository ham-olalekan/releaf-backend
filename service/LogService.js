const { ResumptionExitLog } = require("../model/ResumptionExitLog");
const StaffService = require("../service/StaffService");
const moment = require("moment");

const checkInStaff = (staffId) => {
  return new Promise(async (resolve, reject) => {
    let staff = StaffService.findStaffById(staffId);
    if (!staff) {
      reject(`Invalid staffId: ${staffId}`);
    }

    let log = await getTodayLog(staffId);

    if (log) {
      reject("You have already clocked in today!!!");
    }

    let isLateResumption = getResumptionTime > new Date();

    let dailyLog = new ResumptionExitLog({
      staffId,
      isLateResumption,
    });

    dailyLog = await dailyLog.save();

    resolve(dailyLog);
  });
};

const checkOutStaff = async (staffId) => {
  return new Promise(async (resolve, reject) => {
    let checkOutTime = moment();
    let log = await getTodayLog(staffId);

    if (!log || Object.keys(log).length == 0) {
      reject("You didn't clock in today!!! you can't clock out");
    }

    if (log.checkOutTime) {
      reject(
        "You have already clocked out today!!! you can only clock out once in a day"
      );
    }

    let isEarlyExist = getClosingTime() > checkOutTime;

    log.isEarlyExist = isEarlyExist;
    log.checkOutTime = checkOutTime;

    log = await ResumptionExitLog.findByIdAndUpdate(log._id, log);

    resolve(log);
  });
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
