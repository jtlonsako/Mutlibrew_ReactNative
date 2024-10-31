import Svg, {Path} from 'react-native-svg';

const PourOverIcon = ({ size }) => {
    const sizeParams = {
        "small": {
            "width": 14,
            "height": 25
        },
        "large": {
            "width": 50,
            "height": 80
        },
        "xl": {
            "width": 90,
            "height": 90 
        }
    }

    return(
        <Svg width={sizeParams[size].width} height={sizeParams[size].height} viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4.60194 41.6505L19.9418 79.233H57.5243L72.0971 41.6505H4.60194Z" fill="white"/>
            <Path d="M0 80H79.767M16.8738 1C16.8738 1 11.5049 11.7379 16.8738 14.0388C22.2427 16.3398 23.7767 17.8738 16.8738 28.6117M36.0486 1C36.0486 1 30.6796 11.7379 36.0486 14.0388C41.4175 16.3398 42.9515 17.8738 36.0486 28.6117M55.9903 1C55.9903 1 50.6214 11.7379 55.9903 14.0388C61.3593 16.3398 62.8932 17.8738 55.9903 28.6117M4.60194 41.6505L19.9418 79.233H57.5243L72.0971 41.6505H4.60194Z" stroke="white"/>
        </Svg>
    )
}

export default PourOverIcon;