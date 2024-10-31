import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const BrewTypeDropdownItem = ({ brewType, setDropdownIsOpen }) => {
    function goToBrewType() {
        setDropdownIsOpen(false);
        router.replace(brewType.short_name);
    }

  return (
    <TouchableOpacity onPress={goToBrewType}>
        <View className="w-full grid justify-center py-3 bg-zinc-700">
            <Text className="w-full text-center text-slate-100 font-robotoBold">{brewType.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default BrewTypeDropdownItem