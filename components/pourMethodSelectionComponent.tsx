import { View, Text } from 'react-native'
import React from 'react'

const pourMethodSelectionComponent = ({calculatedGrounds, calculatedWater, pourMethod}) => {
  return (
    <View>
        <Text className="text-slate-100 text-lg font-serif font-light text-center">Pour Amount</Text>
        <View className="border-white border-y  mb-3 opacity-30 w-52 justify-self-center mx-auto" />
    </View>
  )
}

export default pourMethodSelectionComponent