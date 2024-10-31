import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const CustomSelectionModal = ({ closeModalFunction, selectionType, customValueSubtract, 
    customValueAdd, customValueChange, customValue, valuePrefix, valuePostfix }) => {
  return (
    <View className="w-screen h-screen mx-auto my-auto justify-center items-center bg-black/50 backdrop-opacity-50">
    <View className="w-72 h-56 bg-zinc-800 rounded-lg items-center pt-5 pb-3">
      <View className="absolute w-full pl-2 mt-2">
        <TouchableOpacity onPress={closeModalFunction}>
          <View className="ml-2 mt-2 w-5 h-5 rounded-xl bg-white absolute" />
          <AntDesign name="closecircle" size={34} color="black" />
        </TouchableOpacity>
      </View>
      {selectionType === "strength" ? (
        <Text className="text-slate-100 font-roboto text-lg">Set Strength</Text>
      ) : (
        <Text className="text-slate-100 font-roboto text-lg">Set Size</Text>
      )}
      <View className="border-white border-y mb-3 opacity-30 w-48 justify-self-center mx-auto" />
      <View className="w-full flex flex-row justify-center px-2">
        <View className="flex flex-row w-full mt h-16">
          <View className="h-full w-12 items-center justify-center">
            <TouchableOpacity onPress={customValueSubtract}>
              <SimpleLineIcons name="minus" size={24} color="white" />
            </TouchableOpacity> 
          </View>
          <View className="flex flex-row px-2 w-44 h-full bg-zinc-900 rounded-md justify-center">
            <Text className="text-slate-100 text-4xl font-roboto text-center items-center my-auto">{valuePrefix}</Text>
            <TextInput className="text-slate-100 text-4xl font-roboto text-center items-center"
              onChangeText={customValueChange}
              keyboardType="numeric"
              value={customValue.toString()}
            />
            <Text className="text-slate-100 text-4xl font-roboto text-center my-auto">{valuePostfix}</Text>
          </View>
          <View className="h-full w-12 items-center justify-center">
            <TouchableOpacity onPress={customValueAdd}>
              <SimpleLineIcons name="plus" size={24} color="white" />
            </TouchableOpacity> 
          </View>
        </View>
      </View>
    </View>
  </View>
  )
}

export default CustomSelectionModal