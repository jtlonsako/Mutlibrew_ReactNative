import { View, Text } from 'react-native'
import React from 'react'
import CoffeeBeanIcon from '@/lib/icons/CoffeeBeanIcon'

const FinalRecipeView = ({ calculatedGrounds, calculatedWater}) => {
  return (
    <View className="flex w-full h-full mt-2">
          <Text className="text-center text-5xl text-slate-100 font-share">{calculatedGrounds}g</Text>
          <View className="flex flex-row w-full h-fit justify-center">
            <CoffeeBeanIcon size="small" />
             <View className="flex flex-row h-full ml-2">
              <Text className="self-center text-center text-sm text-slate-100 italic">Grounds</Text>
             </View>
          </View>

        <View className="my-4" />

        <Text className="text-center text-5xl text-slate-100 font-share">{calculatedWater}ml</Text>
        <Text className="mt-2 text-center text-sm text-slate-100 italic">Water</Text>
    </View>
  )
}

export default FinalRecipeView