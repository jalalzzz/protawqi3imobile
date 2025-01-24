export default class Validator {
  static checkEmail = (email) => {
    let check;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) == false) {
      check = false;
    } else check = true;
    return check;
  };
}
