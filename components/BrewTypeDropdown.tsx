import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState } from 'react'
import BrewTypeDropdownItem from './BrewTypeDropdownItem'

const BrewTypeDropdown = ({ brewTypes, currentPath }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <View className="grid w-5/12 md:pt-5 lg:w-3/12" style={[{zIndex: 1}]}>
        <TouchableWithoutFeedback onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
            <View className="flex bg-zinc-700 justify-items-center rounded-md">
                <Text className="w-full justify-center text-center text-slate-100 py-2 font-robotoBold">{currentPath}</Text>
            </View>
        </TouchableWithoutFeedback>
        
        {dropdownIsOpen ? (
        
            <View className="absolute w-full mt-10">
                <View className="w-full mx-auto rounded-xl">
                    <FlatList 
                        data={brewTypes}
                        renderItem={({item}) => <BrewTypeDropdownItem brewType={item} setDropdownIsOpen={setDropdownIsOpen} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        ) : (<View />)
        }
    </View>
  )
}

export default BrewTypeDropdown