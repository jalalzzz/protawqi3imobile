import I18n, { getLanguages } from 'react-native-i18n';

import ar from './ar';
import en from './en';

I18n.fallbacks = true;
I18n.locale = 'ar-Us';
I18n.translations = {
  ar,
  en,
};

getLanguages()
  .then((languages) => {
    //console.log("getLanguages", languages); // ['en-US', 'en']
  })
  .catch((error) => {
    // console.log("getLanguages error : ", error);
  });
export default I18n;
