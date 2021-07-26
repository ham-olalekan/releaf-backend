const mongoose = require("mongoose");
const { Schema } = mongoose;
const Staff = mongoose.model(
  "Staff",
  new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    staffId: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "LEFT", "SUSPENDED"],
      default: "ACTIVE",
    },
  })
);

exports.Staff = Staff;
