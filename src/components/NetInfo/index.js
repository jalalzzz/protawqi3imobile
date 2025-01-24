import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function InternetCheck() {
  const [isConnected, setIsConnected] = useState(false);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    //Intial status
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isInternetReachable);
    });

    //Internet connection listener
    NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== false) {
        setFlag(false);
      }
      // console.warn("called");
      // console.log(state.isInternetReachable);
      // console.warn(state.isInternetReachable);
      setIsConnected(state.isInternetReachable);
      setTimeout(() => {
        setFlag(false);
      }, 3000);
    });
  }, []);

  return (
    <React.Fragment>
      {!isConnected == false && flag && (
        <Animated.View
          style={{
            backgroundColor: 'red',
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            top: 50,
            width: Dimensions.get('window').width * 0.9,
            height: 50,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 12,
          }}
          animation='fadeInDown'>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
                fontFamily: 'DINNextLTArabic-Regular',
                fontSize: 15,
              }}>
              *تحذير أنت غير متصل حاليًا - يُرجى إعادة الاتصال لاستخدام ميزات
              هذه التطبيقات .
            </Text>
          </View>
        </Animated.View>
      )}
    </React.Fragment>
  );
}
