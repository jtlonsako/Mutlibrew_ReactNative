import FinalRecipeView from "@/components/FinalRecipeView";
import SizeSelection from "@/components/SizeSelection";
import StopwatchComponent from "@/components/StopwatchComponent";
import StrengthSelection from "@/components/StrengthSelection";
import { getStrengthOptions, getSizeOptions } from "@/lib/database";
import {calculateCoffeeAmount, calculateWaterAmount} from "@/lib/utils/calculations";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import * as React from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(2).keys()];
const width = Dimensions.get("window").width;

const FrenchPress = () => {
  const navigation = useNavigation();
  const [strengthOptions, setStrengthOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sizeOptionType, setSizeOptionType] = useState(1);
  const [selectedStrength, setSelectedStrength] = useState(15);
  const [selectedStrengthId, setSelectedStrengthId] = useState();
  const [selectedSize, setSelectedSize] = useState(250);
  const [selectedSizeId, setSelectedSizeId] = useState();

  const [calculatedGrounds, setCalculatedGrounds] = useState(15);
  const [calculatedWater, setCalculatedWater] = useState(250);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    async function fetchData() {
      try {
        const strengthResult = await getStrengthOptions("press");
        const sizeResult = await getSizeOptions("press");
        setStrengthOptions(strengthResult);
        setSizeOptions(sizeResult);
        setSelectedStrength(strengthResult[1].value);
        setSelectedSize(sizeResult[1].value);
        setSelectedStrengthId(strengthResult[1].BrewCalculationDescriptorId)
        setSelectedSizeId(sizeResult[1].BrewCalculationDescriptorId)
      } catch (error) {
        console.log(error);
        }
      }

      fetchData();
    }, [])

    useEffect(() => {
      calculateCoffeeAmount(sizeOptionType, selectedSize, selectedStrength, setCalculatedGrounds);
      calculateWaterAmount(sizeOptionType, selectedSize, selectedStrength, setCalculatedWater);
    }, [selectedStrength, selectedSize])
  
  return(
    <ScrollView>
        <StrengthSelection 
          strengthOptions={strengthOptions}
          selectedOption={selectedStrengthId}
          setSelectedStrength={setSelectedStrength}
          setSelectedOption={setSelectedStrengthId}
        />

        <View className="my-4" />

        <SizeSelection 
          sizeOptions={sizeOptions}
          selectedOption={selectedSizeId}
          sizeOptionType={sizeOptionType}
          setSelectedSize={setSelectedSize}
          setSizeOptionType={setSizeOptionType}
          setSelectedOption={setSelectedSizeId}
        />

      <View className="my-5" />

      <Text className="text-center text-slate-100 text-2xl font-share">Final Recipe</Text>
      <View className="border-white border-y mt-1 mb-3 opacity-30 w-52 justify-self-center mx-auto" />
      <View style={{ flex: 1 }}>
            <Carousel
              ref={ref}
              width={width}
              height={width / 1.13}
              data={data}
              onProgressChange={progress}
              renderItem={({ index }) => 
                index === 0 ? (
                
                <FinalRecipeView 
                  calculatedGrounds={calculatedGrounds}
                  calculatedWater={calculatedWater}
                />) : (
                  <StopwatchComponent
                  calculatedWater={calculatedWater}
                  calculatedGrounds={calculatedGrounds}
                />
                )}
            />
      
            <Pagination.Basic
              progress={progress}
              data={data}
              dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
              containerStyle={{ gap: 5, marginTop: 10 }}
              onPress={onPressPagination}
            />
        </View>

    </ScrollView>
  );
}

export default FrenchPress