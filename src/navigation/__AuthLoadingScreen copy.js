// //*********3333333333 */

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   Button,
//   Text,
//   Image,
//   TouchableHighlight,
//   Alert,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import FaceSDK, {
//   Enum,
//   FaceCaptureResponse,
//   LivenessResponse,
//   MatchFacesResponse,
//   MatchFacesRequest,
//   MatchFacesImage,
//   MatchFacesSimilarityThresholdSplit,
// } from "@regulaforensics/react-native-face-api";

// var image1 = new MatchFacesImage();
// var image2 = new MatchFacesImage();

// export default class AuthLoadingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       img1: require("./images/portrait.png"),
//       img2: require("./images/portrait.png"),
//       similarity: "nil",
//       liveness: "nil",
//     };
//   }

//   pickImage(first) {
//     Alert.alert(
//       "Select option",
//       "",
//       [
//         {
//           text: "Use gallery",
//           onPress: () =>
//             launchImageLibrary({ includeBase64: true }, (response) => {
//               this.setImage(first, response.base64, Enum.ImageType.PRINTED);
//             }),
//         },
//         {
//           text: "Use camera",
//           onPress: () =>
//             FaceSDK.presentFaceCaptureActivity(
//               (result) => {
//                 this.setImage(
//                   first,
//                   FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
//                   Enum.ImageType.LIVE
//                 );
//               },
//               (e) => {}
//             ),
//         },
//       ],
//       { cancelable: true }
//     );
//   }

//   setImage(first, base64, type) {
//     if (base64 == null) return;
//     this.setState({ similarity: "nil" });
//     if (first) {
//       image1.bitmap = base64;
//       image1.imageType = type;
//       this.setState({ img1: { uri: "data:image/png;base64," + base64 } });
//       this.setState({ liveness: "nil" });
//     } else {
//       image2.bitmap = base64;
//       image2.imageType = type;
//       this.setState({ img2: { uri: "data:image/png;base64," + base64 } });
//     }
//   }

//   clearResults() {
//     this.setState({
//       img1: require("./images/portrait.png"),
//       img2: require("./images/portrait.png"),
//       similarity: "nil",
//       liveness: "nil",
//     });
//     image1 = new MatchFacesImage();
//     image2 = new MatchFacesImage();
//   }

//   matchFaces() {
//     if (
//       image1 == null ||
//       image1.bitmap == null ||
//       image1.bitmap == "" ||
//       image2 == null ||
//       image2.bitmap == null ||
//       image2.bitmap == ""
//     )
//       return;
//     this.setState({ similarity: "Processing..." });
//     request = new MatchFacesRequest();
//     request.images = [image1, image2];
//     FaceSDK.matchFaces(
//       JSON.stringify(request),
//       (response) => {
//         response = MatchFacesResponse.fromJson(JSON.parse(response));
//         FaceSDK.matchFacesSimilarityThresholdSplit(
//           JSON.stringify(response.results),
//           0.75,
//           (str) => {
//             var split = MatchFacesSimilarityThresholdSplit.fromJson(
//               JSON.parse(str)
//             );
//             this.setState({
//               similarity:
//                 split.matchedFaces.length > 0
//                   ? (split.matchedFaces[0].similarity * 100).toFixed(2) + "%"
//                   : "error",
//             });
//           },
//           (e) => {
//             this.setState({ similarity: e });
//           }
//         );
//       },
//       (e) => {
//         this.setState({ similarity: e });
//       }
//     );
//   }

//   liveness() {
//     FaceSDK.startLiveness(
//       (result) => {
//         result = LivenessResponse.fromJson(JSON.parse(result));

//         this.setImage(true, result.bitmap, Enum.ImageType.LIVE);
//         if (result.bitmap != null)
//           this.setState({
//             liveness: result["liveness"] == 0 ? "passed" : "unknown",
//           });
//       },
//       (e) => {}
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <View style={{ flexDirection: "column", padding: 5 }}>
//             <View style={{ flexDirection: "column", alignItems: "center" }}>
//               <TouchableHighlight onPress={() => this.pickImage(true)}>
//                 <Image
//                   style={{
//                     height: 150,
//                     width: 150,
//                   }}
//                   source={this.state.img1}
//                   resizeMode="contain"
//                 />
//               </TouchableHighlight>
//             </View>
//             <View
//               style={{
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: 5,
//               }}
//             >
//               <TouchableHighlight onPress={() => this.pickImage(false)}>
//                 <Image
//                   style={{
//                     height: 150,
//                     width: 200,
//                   }}
//                   source={this.state.img2}
//                   resizeMode="contain"
//                 />
//               </TouchableHighlight>
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: "column",
//               width: "100%",
//               alignItems: "center",
//             }}
//           >
//             <View style={{ padding: 3, width: "75%" }}>
//               <Button
//                 color="#4285F4"
//                 onPress={() => {
//                   this.matchFaces();
//                 }}
//                 title="     Match     "
//               />
//             </View>
//             <View style={{ padding: 3, width: "75%" }}>
//               <Button
//                 color="#4285F4"
//                 onPress={() => {
//                   this.liveness();
//                 }}
//                 title="     Liveness     "
//               />
//             </View>
//             <View style={{ padding: 3, width: "75%" }}>
//               <Button
//                 color="#4285F4"
//                 onPress={() => {
//                   this.clearResults();
//                 }}
//                 title="Clear"
//               />
//             </View>
//           </View>
//           <View style={{ flexDirection: "row" }}>
//             <Text style={{ marginLeft: -20 }}>
//               Similarity: {this.state.similarity}
//             </Text>
//             <Text style={{ marginLeft: 20 }}>
//               Liveness: {this.state.liveness}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//     marginBottom: 12,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5,
//   },
//   resultsScreenBackButton: {
//     position: "absolute",
//     bottom: 0,
//     right: 20,
//   },
// });

//*********222222222222222222 */

// import React, { useState } from "react";
// import { Button, Image, StyleSheet, View, Switch, Text } from "react-native";
// import ImagePicker from "react-native-image-crop-picker";
// import FaceDetection from "@react-native-ml-kit/face-detection";

// import FaceMap from "./FaceMap";

// const AuthLoadingScreen = () => {
//   const [image, setImage] = useState();
//   const [faces, setFaces] = useState([]);
//   const [hideFrame, setHideFrame] = useState(false);
//   const [showLandmarks, setShowLandmarks] = useState(false);
//   const [showContours, setShowContours] = useState(false);

//   const handlePress = async () => {
//     setFaces([]);

//     const _image = await ImagePicker.openPicker({
//       mediaType: "photo",
//       width: 350,
//       height: 350,
//       cropping: true,
//     });
//     setImage(_image);

//     const result = await FaceDetection.detect("file://" + _image.path, {
//       landmarkMode: "all",
//       contourMode: "all",
//     });
//     debugger;
//     setFaces(result);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Choose an Image" onPress={handlePress} />

//       {image && (
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: image.path }}
//             style={[styles.image, { height: image.height, width: image.width }]}
//           />

//           {faces.map((face) => (
//             <FaceMap
//               key={Math.random()}
//               face={face}
//               width={image.width}
//               height={image.height}
//               hideFrame={hideFrame}
//               showContours={showContours}
//               showLandmarks={showLandmarks}
//             />
//           ))}

//           <View style={styles.switchContainer}>
//             <Switch value={hideFrame} onValueChange={setHideFrame} />
//             <Text style={styles.switchLabel}>Hide Frame</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch value={showLandmarks} onValueChange={setShowLandmarks} />
//             <Text style={styles.switchLabel}>Show Landmarks</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch value={showContours} onValueChange={setShowContours} />
//             <Text style={styles.switchLabel}>Show Contours</Text>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     borderRadius: 10,
//   },
//   imageContainer: {
//     marginTop: 15,
//     marginBottom: 20,
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   switchLabel: {
//     color: "#333",
//   },
// });

// export default AuthLoadingScreen;

//*********111111111111111 */

// /** @format */
// import React, { PureComponent } from "react";
// import { StyleSheet, TouchableOpacityBase, View } from "react-native";
// import { UserService } from "@services";
// import AuthTokenStorage from "@store/AuthTokenStorage";
// import { AppLoading } from "@components";
// import { connect } from "react-redux";

// class AuthLoadingScreen extends PureComponent {
//   constructor(props) {
//     super(props);

//     this._bootstrapAsync();
//   }

//   componentDidMount = () => {
//     this._bootstrapAsync();
//     // this.focusListener = this.props.navigation.addListener("focus", () => {
//     //   this._bootstrapAsync();
//     // });
//   };

//   componentWillReceiveProps = async (nextProps) => {
//     if (this.props.isTokenCheck !== nextProps.isTokenCheck) {
//       if (nextProps.isTokenCheck) {
//         this.props.navigation.navigate("Login");
//       } else {
//         this.props.navigation.navigate("Register");
//       }
//     }
//   };

//   // componentWillReceiveProps = (nextProps) => {
//   //   this._bootstrapAsync();
//   // };

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const token = await AuthTokenStorage.getToken();
//     if (token) {
//       this.props.checkToken(token);
//     } else {
//       this.props.navigation.navigate("Register");
//     }
//     //this.props.navigation.navigate(isReg ? "Home" : "Register");
//   };

//   // Render any loading content that you like here
//   render() {
//     return <AppLoading style={{ marginTop: "90%" }} />;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const mapStateToProps = ({ register }) => ({
//   isTokenCheck: register.isTokenCheck,
// });

// function mergeProps(stateProps, dispatchProps, ownProps) {
//   const { dispatch } = dispatchProps;
//   const RegisterRedux = require("@redux/RegisterRedux");

//   return {
//     ...ownProps,
//     ...stateProps,
//     checkToken: (token) => {
//       RegisterRedux.actions.checkToken(dispatch, token);
//     },
//   };
// }
// export default connect(mapStateToProps, null, mergeProps)(AuthLoadingScreen);
