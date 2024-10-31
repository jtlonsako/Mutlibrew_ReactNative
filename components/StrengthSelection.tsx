import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import SelectionCard from './SelectionCard'

const StrengthSelection = ({ strengthOptions, selectedOption, setSelectedStrength, setSelectedOption }) => {
  const [customButtonDetails, setCustomButtonDetails] = useState({
    value: 12,
    descriptionValue: "1:12",
    BrewCalculationDescriptorId: 7
  });

  strengthOptions = [...strengthOptions, customButtonDetails];

  return (
    <View className="grid w-full justify-items-center ">
        <Text className="text-slate-100 text-lg font-serif font-light text-center">Select Strength</Text>
        <View className="border-white border-y  mb-3 opacity-30 w-52 justify-self-center mx-auto" />
        <View className="w-full flex items-center justify-center">
            <FlatList 
              data={strengthOptions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <SelectionCard selectionType="strength" selectionOptionDetails={item} selectedOption={selectedOption} setSelectionValue={setSelectedStrength} setCustomButton={setCustomButtonDetails} setSelectedOption={setSelectedOption} valuePrefix="1:" />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
        </View>
    </View>
  )
}

export default StrengthSelection