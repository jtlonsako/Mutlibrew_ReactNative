import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const IndividualPourAmount = ({data, id, alignment}) => {
  return (
    <View>
      {alignment === 'vertical' ? (
        <View className="w-full flex flex-row justify-center mt-1">
            <Text className="text-slate-100 w-24 font-share text-2xl">Pour {id + 1}: </Text>
            <Text className="text-slate-100 w-20 text-right font-share text-2xl">{data}ml</Text>
        </View>
      ) : (
        <View className="mx-2 w-full flex">
          <Text className="text-slate-100 font-share text-base text-center">{data}ml</Text>
          <Text className="text-slate-100 font-share text-sm text-center">Pour {id + 1}</Text>
        </View>
      )}
    </View>
  )
}

export default IndividualPourAmount