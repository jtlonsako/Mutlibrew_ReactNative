import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectionCard from './SelectionCard'
import CoffeeBeanIcon from '@/lib/icons/CoffeeBeanIcon';
import WaterDropIcon from '@/lib/icons/WaterDropIcon';

const SizeSelection = ({ sizeOptions, sizeOptionType, selectedOption, setSelectedSize, setSelectedOption, setSizeOptionType }) => {
  const [displayedSizeOptions, setDisplayedSizeOptions] = useState([...sizeOptions]);
  const [customButtonDetails, setCustomButtonDetails] = useState(
    sizeOptionType === 1 ? {
      value: 500,
      descriptionValue: "500ml",
      BrewCalculationDescriptorId: 7
    } : {
      value: 30,
      descriptionValue: "30g",
      BrewCalculationDescriptorId: 7
    }
  );

  useEffect(() => {
    if(sizeOptionType == 1) {
      setCustomButtonDetails({
        value: 500,
        descriptionValue: "500ml",
        BrewCalculationDescriptorId: 7
      })
    } else if(sizeOptionType == 0){
      setCustomButtonDetails({
        value: 30,
        descriptionValue: "30g",
        BrewCalculationDescriptorId: 7
      })
    }
  }, [sizeOptionType])

  useEffect(() => {
    setDisplayedSizeOptions([...sizeOptions.filter((sizeOption) => sizeOption.coffeeOrWater == sizeOptionType), customButtonDetails])
    if(sizeOptions && sizeOptions.length > 0) {
      setSelectedOption(sizeOptions.filter((sizeOption) => sizeOption.coffeeOrWater === sizeOptionType)[1].BrewCalculationDescriptorId)
      setSelectedSize(sizeOptions.filter((sizeOption) => sizeOption.coffeeOrWater === sizeOptionType)[1].value)
    }
  }, [sizeOptionType, sizeOptions]);

  useEffect(() => {
    setDisplayedSizeOptions([...sizeOptions.filter((sizeOption) => sizeOption.coffeeOrWater == sizeOptionType), customButtonDetails])
  }, [customButtonDetails])

  return (
    <View className="grid w-full justify-items-center">
      <View className="flex flex-row w-full justify-center">
        <View className="w-12" />
        <Text className="text-slate-100 text-lg font-serif font-light text-center">Select Size</Text>
        <View className="flex flex-row justify-end w-fit ml-2">
        {
            sizeOptionType === 1 ? (
              <TouchableOpacity className="flex items-center w-6 h-6 ml-1" onPress={() => setSizeOptionType(1)}>
                <WaterDropIcon size="medium" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="flex items-center w-6 h-6 ml-1 opacity-20" onPress={() => setSizeOptionType(1)}>
                <WaterDropIcon size="medium" />
              </TouchableOpacity>
            )
          }
          {
            sizeOptionType === 0 ? (
              <TouchableOpacity className="flex items-center w-5 h-6 ml-1" onPress={() => setSizeOptionType(0)}>
                <CoffeeBeanIcon size="small" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="flex items-center w-5 h-6 ml-1 opacity-20" onPress={() => setSizeOptionType(0)}>
                <CoffeeBeanIcon size="small" />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
        <View className="border-white border-y mt-1 mb-3 opacity-30 w-52 justify-self-center mx-auto" />
        <View className="w-full flex items-center justify-center">
            <FlatList 
              data={displayedSizeOptions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <SelectionCard selectionType="size" selectionOptionDetails={item} selectedOption={selectedOption} setSelectionValue={setSelectedSize} setCustomButton={setCustomButtonDetails} setSelectedOption={setSelectedOption} valuePostfix={sizeOptionType === 1 ? 'ml' : 'g'} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
        </View>
    </View>
  )
}

export default SizeSelection