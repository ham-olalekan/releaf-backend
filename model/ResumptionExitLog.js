const mongoose = require("mongoose");
const { Schema } = mongoose;
const ResumptionExitLog = mongoose.model(
  "ResumptionExitLog",
  new Schema({
    staffId: {
      type: Number,
      required: true,
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: {
      type: Date,
      default: null
    },
    isLateResumption: {
      type: Boolean,
      default: true,
    },
    isEarlyExist: {
      type: Boolean,
      default: false,
    },
  })
);

exports.ResumptionExitLog = ResumptionExitLog;
