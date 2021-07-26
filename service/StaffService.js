const { Staff } = require("../model/Staff");

const createNewStaff = async (payload) => {
  const { firstName, lastName, gender } = payload;

  let staffCount = await countStaffMembers();
  let staffId = staffCount + 1;

  let newStaff = new Staff({
    firstName,
    lastName,
    gender,
    staffId: staffId,
  });

  return newStaff.save();
};

const updateStaffInfo = async (staffId, payload) => {
  let { firstName, lastName } = payload;
  const existingStaffInfo = await findStaffById(staffId);
  if (!existingStaffInfo) {
    return new Promise.reject(`Invalid staff Id ${staffId}`);
  }

  existingStaffInfo.firstName =
    firstName == null ? existingStaffInfo.firstName : firstName;
  existingStaffInfo.lastName =
    lastName == null ? existingStaffInfo.lastName : lastName;

  await updateStaff(existingStaffInfo);

  return existingStaffInfo;
};

const countStaffMembers = () => {
  return Staff.countDocuments();
};

const findStaffById = async (staffId) => {
  const staff = await Staff.findOne({
    staffId: staffId,
  }).select("-__v");
  return staff;
};

const updateStaff = (staffObj) => {
  staffObj.updatedAt = new Date();
  return Staff.updateOne(staffObj);
};

exports.createNewStaff = createNewStaff;
exports.updateStaffInfo = updateStaffInfo;
exports.findStaffById = findStaffById;
