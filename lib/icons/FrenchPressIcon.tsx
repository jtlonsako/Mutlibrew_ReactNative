import Svg, {Path, Line, Ellipse} from 'react-native-svg';

const FrenchPressIcon = () => {
    return (
        <Svg width="51" height="89" viewBox="0 0 51 89" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Line x1="0.5" y1="13" x2="0.5" y2="88" stroke="white"/>
            <Line x1="50.5" y1="13" x2="50.5" y2="88" stroke="white"/>
            <Ellipse cx="25.5" cy="6.5" rx="2.5" ry="1.5" fill="white"/>
            <Line x1="51" y1="88.5" y2="88.5" stroke="white"/>
            <Path d="M0 11.9512V11.9512C15.9751 4.37901 34.4894 4.29907 50.5292 11.733L51 11.9512V14H0V11.9512Z" fill="white"/>
            <Path d="M1 28.1676L2.83287 29.4766C5.26285 31.212 8.53688 31.1739 10.9259 29.3825V29.3825C12.0006 28.5765 13.1839 27.925 14.4395 27.4473V27.4473C17.3907 26.3248 20.6533 26.324 23.6046 27.4466L25.5 28.1676L25.9504 28.3879C29.7345 30.2385 34.1776 30.1565 37.8908 28.1676V28.1676V28.1676C41.595 26.1835 46.0364 26.1411 49.7778 28.054L50 28.1676V88H1V28.1676Z" fill="white"/>
        </Svg>
    )
}

export default FrenchPressIcon;
    