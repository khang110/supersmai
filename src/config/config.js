import { Dimensions, Platform, PixelRatio } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");
const scale= SCREEN_WIDTH / 375;
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
const screen_height = SCREEN_HEIGHT;
const screen_width = SCREEN_WIDTH;
const main_color = '#1BA8FF';
const active_color = '#CAD7FF';
const white = "#FFF";
const black = "#000";
const gray = '#BDBDBD'
const margin_1 = "2%";
const margin_2 = "4%";




export default {
  fontsize_1,
  fontsize_2,
  fontsize_3,
  fontsize_4,
  fontsize_5,
  fontsize_6,
  main_color,
  active_color,
  screen_width,
  screen_height,
  white, 
  black,
  gray,
  margin_1,
  margin_2,
};