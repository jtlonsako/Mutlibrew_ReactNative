import { View, Text, TouchableOpacity } from 'react-native'
import PourOverIcon from '@/lib/icons/PourOverIcon'
import FrenchPressIcon from '@/lib/icons/FrenchPressIcon'
import React from 'react'
import VietnamesePhinIcon from '@/lib/icons/VietnamesePhinIcon'
import AeropressIcon from '@/lib/icons/AeropressIcon'
import { router } from 'expo-router'

const BrewTypeCard = ({ brewTypeName, route }) => {

    const switchPage = () => {
        router.push(`${route}`);
    }

    const displayBrewTypeIcon = () => {
        if (brewTypeName === 'Pour Over') {
            return (
                <PourOverIcon size="xl" />
            )
        } else if (brewTypeName === 'French Press') {
            return (
                <FrenchPressIcon />
            )
        } else if (brewTypeName === 'Vietnamese Phin') {
            return (
                <VietnamesePhinIcon />
            )
        } else if (brewTypeName === 'Aeropress') {
            return (
                <AeropressIcon />
            )
        }
    }

    return (
        <TouchableOpacity onPress={switchPage}>
            <View className="h-48 w-60 xl:h-60 xl:w-72 my-2 items-center bg-zinc-700 rounded-xl">
                <View className="mt-5">
                        {displayBrewTypeIcon()}
                </View>
                <Text className="text-zinc-50 mt-5 font-robotoBold xl:text-xl">{brewTypeName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BrewTypeCard