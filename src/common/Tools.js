import { Dimensions } from "react-native";

export default class Tools {
  static formatDocSignNameLength(text, width) {
    if (!text) return text;
    var length = width > 700 ? 62 : 32;
    if (text && text.length < length) return text;
    else {
      return text.substring(length - 1, 0) + "...";
    }
  }

  static ValidateIPaddress(ipaddress) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        myForm.emailAddr.value
      )
    ) {
      return true;
    }
    alert("You have entered an invalid IP address!");
    return false;
  }
}
