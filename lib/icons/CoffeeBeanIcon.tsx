import Svg, {Path} from "react-native-svg";

const CoffeeBeanIcon = ({ size }) => {
    const sizeParams = {
        extrasmall: {
            width: 10,
            height: 20
        },
        small: {
            width: 14,
            height: 25
        },
        large: {
            width: 50,
            height: 80
        }
    }

  return (
    <Svg width={sizeParams[size].width} height={sizeParams[size].height} viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12.5 13.5C12.5 16.3286 11.8438 18.8648 10.8085 20.6766C9.76517 22.5024 8.39999 23.5 7 23.5C5.60001 23.5 4.23483 22.5024 3.19148 20.6766C2.15622 18.8648 1.5 16.3286 1.5 13.5C1.5 10.6714 2.15622 8.13516 3.19148 6.32345C4.23483 4.49759 5.60001 3.5 7 3.5C8.39999 3.5 9.76517 4.49759 10.8085 6.32345C11.8438 8.13516 12.5 10.6714 12.5 13.5Z" fill="white" stroke="black"/>
        <Path d="M7 3.5C7 3.5 6.05244 8.78529 6.00227 12.75C5.94471 17.2991 7 23.5 7 23.5C7 23.5 8.05529 17.2991 7.99773 12.75C7.94756 8.78529 7 3.5 7 3.5Z" fill="black" stroke="#020202"/>
    </Svg>
  )
}

export default CoffeeBeanIcon