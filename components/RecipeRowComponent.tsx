import { View, Text } from 'react-native'
import React from 'react'
import CoffeeBeanIcon from '@/lib/icons/CoffeeBeanIcon'
import WaterDropIcon from '@/lib/icons/WaterDropIcon'

const RecipeRowComponent = ({coffeeAmount, waterAmount}) => {
  return (
    <View className="w-full flex flex-row px-10">
      <View className="flex flex-row w-1/2">
        <CoffeeBeanIcon size="small" />
        <Text className="text-slate-100 text-start w-full font-robotoBold text-lg ml-2">{coffeeAmount}g</Text>
      </View>

      <View className="w-1/2 flex flex-row justify-end">
        <WaterDropIcon size="medium" />
        <Text className="text-slate-100 font-robotoBold text-lg">{waterAmount}ml</Text>
      </View>
    </View>
  )
}

export default RecipeRowComponent