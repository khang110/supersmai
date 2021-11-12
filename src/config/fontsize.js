import { Dimensions, Platform, PixelRatio } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;
function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS == 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


const fontsize_1 = normalize(25)
const fontsize_2 = normalize(20)
const fontsize_3 = normalize(18)
const fontsize_4 = normalize(16)
const fontsize_5 = normalize(14)
const fontsize_6 = normalize(10)

export default {
  fontsize_1,
  fontsize_2,
  fontsize_3,
  fontsize_4,
  fontsize_5,
  fontsize_6,
};