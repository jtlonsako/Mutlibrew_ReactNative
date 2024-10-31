import Svg, {Path} from "react-native-svg";

const WaterDropIcon = ({ size }) => {
    const sizeParams =
    {
        extrasmall: {
            width: 10,
            height: 10
        },
        small: {
            width: 20,
            height: 22
        },

        medium: {
            width: 25,
            height: 25
        }
    }

    return (
        <Svg width={sizeParams[size].width} height={sizeParams[size].height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6.5 2L9.47297 6.4106C10.6091 8.474 9.11639 11 6.76087 11H6.23913C3.88361 11 2.39087 8.474 3.52703 6.4106L6.5 2Z" fill="#D9D9D9"/>
            <Path d="M9 8V8C9 9.10457 8.10457 10 7 10V10" stroke="#525252" stroke-width="0.4"/>
        </Svg>
    )
}

export default WaterDropIcon