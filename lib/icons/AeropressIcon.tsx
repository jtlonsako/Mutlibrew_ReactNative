import { View } from "react-native";
import Svg, {Path, Line, Rect} from "react-native-svg";

const AeropressIcon = () => {
    return (
        <View className="-my-20">
            <Svg width="63" height="122" viewBox="0 0 63 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="6" y="36" width="51" height="85" fill="white"/>
            <Rect x="10.5" y="1.5" width="42" height="36" fill="#D9D9D9" opacity="0.4" stroke="white"/>
            <Path d="M-7 121.5H70" stroke="white"/>
            <Line y1="1.5" x2="63" y2="1.5" stroke="white"/>
            </Svg>
        </View>
    )
}

export default AeropressIcon;