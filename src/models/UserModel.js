class UserModel {
  constructor(
    id,
    nationalNo,
    name,
    dOB,
    jobTitleId,
    department,
    email,
    mobileNo,
    appAccess,
    active,
    jobTitleName,
    imei,
    signImg,
    nickName,
    shortName
  ) {
    this.id = id;
    this.nationalNo = nationalNo;
    this.name = name;
    this.dOB = dOB;
    this.jobTitleId = jobTitleId;
    this.department = department;
    this.email = email;
    this.mobileNo = mobileNo;
    this.appAccess = appAccess;
    this.active = active;
    this.jobTitleName = jobTitleName;
    this.imei = imei;
    this.signImg = signImg;
    this.nickName = nickName;
    this.shortName = shortName;
  }
}

export default UserModel;
