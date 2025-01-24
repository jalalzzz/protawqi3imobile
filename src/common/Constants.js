const Constants = {
  fontFamilyRegular: "DINNextLTArabic-Regular",
  fontFamilySemiBold: "DINNextLTArabic-Regular",
  fontFamily400Regular: "DINNextLTArabic-Regular",
  fontFamily600SemiBold: "DINNextLTArabic-Regular",
  fontFamilyBold: "DINNextLTArabic-Regular",
  pageSize: 5,
  EmitCode: {
    Toast: "toast",
  },
  docStatusId: {
    Draft: 1,
    Waiting: 2,
    Completed: 3,
  },
  docSignUserStatus: {
    Waiting: 1,
    Confirmed: 2,
    Refused: 3,
    Viewed: 4,
  },
  MeetingType: {
    Small: 1,
    Big: 2,
    BigSmall: 3,
  },
  deviceType: {
    OneUser: 1,
    Shared: 2,
  },
  fontSize: {
    XSmall: 10,
    Small: 12,
    Large: 15,
    Medium: 17,
    XLarge: 20,
    XXLarege: 22,
  },
  Language: "en",
  RTL: true,
  TouchIdConfig: {
    title: "", // Android
    imageColor: "#0877d0", // Android
    imageErrorColor: "#ff0000", // Android
    sensorDescription: "Touch sensor", // Android
    sensorErrorDescription: "Failed", // Android
    // Android
    fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  },
  DeviceType: {
    oneUser: 1,
    shared: 2,
  },
};
export default Constants;
