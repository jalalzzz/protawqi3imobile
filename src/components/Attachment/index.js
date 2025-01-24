import React, { PureComponent } from "react";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { AppLoading } from "@components";

class Info extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      index: 0,
    };
  }

  componentDidMount = async () => {
    this.setState({ refresh: true });
    this.getAttachment();
    setTimeout(() => {
      this.setState({ refresh: false });
    }, 1100);
  };

  getAttachment = async () => {
    await this.props.getAttachment(this.props.docSignGuid);
  };
  downloadAttachment = async (i, index, attachmentName) => {
    this.props.onOpenAttachment(i, ++index, attachmentName);
  };
  render() {
    return !this.state.refresh ? (
      <View style={styles.container}>
        {this.props.attachmentList && this.props.attachmentList.length >= 1 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => {
                  this.getAttachment();
                }}
              />
            }
            data={this.props.attachmentList}
            renderItem={({ item, index }) => (
              <>
                <TouchableOpacity
                  style={styles.attachment}
                  onPress={() => {
                    this.downloadAttachment(item.DownloadUrl, index, item.Name);
                    this.props.getNotes(item.Id);
                  }}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      fontFamily: "DINNextLTArabic-Regular",
                      color: "#00000099",
                    }}>
                    {item.Name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 350 }}
          />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              marginTop: "60%",
              fontSize: 20,
              fontFamily: "DINNextLTArabic-Regular",
            }}>
            لا يوجد مرفقات
          </Text>
        )}
      </View>
    ) : (
      <AppLoading attachment={true} />
    );
  }
}
const mapStateToProps = ({ user }) => ({
  attachmentList: user.attachmentList,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const UserRedux = require("@redux/UserRedux");

  return {
    ...ownProps,
    ...stateProps,
    getAttachment: (id) => {
      UserRedux.actions.getAttachment(dispatch, id);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Info);
