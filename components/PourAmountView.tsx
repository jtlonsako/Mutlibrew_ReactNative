import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import IndividualPourAmount from './IndividualPourAmount';
import RecipeRowComponent from './RecipeRowComponent';
import { calculatePourAmounts } from '@/lib/utils/calculations';
import KasuyaSelector from './KasuyaSelector';

let pourMethods = {
    hoffmann: "James Hoffmann: Simple",
    kasuya: "Tetsu Kasuya: Four Six"
}

const PourAmountView = ({calculatedWater, calculatedGrounds, alignment, pourAmountArray, setPourAmountArray}) => {
    const [pourMethod, setPourMethod] = useState("hoffmann");
    //const [pourAmountArray, setPourAmountArray] = useState(calculatePourAmounts(pourMethod, calculatedWater));

    const [balance, setBalance] = useState('Sweet');
    const [strength, setStrength] = useState('Medium');
  
    const balanceOptions = ['Sweet', 'Even', 'Bright'];
    const strengthOptions = ['Mild', 'Medium', 'Heavy'];

    useEffect(() => {
        setPourAmountArray(calculatePourAmounts(pourMethod, calculatedWater, balance, strength));
    }, [calculatedWater, pourMethod, balance, strength]);

    function changePourMethod() {
        if (pourMethod === "hoffmann") setPourMethod("kasuya")
        else setPourMethod("hoffmann");
    }

    return (
        <View className="w-full flex justify-items-center">
            <RecipeRowComponent coffeeAmount={calculatedGrounds} waterAmount={calculatedWater} />

            <View className="flex flex-row justify-center my-4 py-1 w-9/12 mx-auto items-center">
                <TouchableOpacity onPress={changePourMethod}>
                    <AntDesign name="caretleft" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-slate-100 font-share text-xl text-center tracking-tight mx-4">{pourMethods[pourMethod]}</Text>
                <TouchableOpacity onPress={changePourMethod}>
                    <AntDesign name="caretright" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {pourMethod === "kasuya" ? (
                <View className="flex flex-row w-5/6 mx-auto -mt-4 mb-3 justify-between">
                    <KasuyaSelector selectorType="Balance" selectorOptions={balanceOptions} currentSelector={balance} setSelector={setBalance} />
                    <KasuyaSelector selectorType="Strength" selectorOptions={strengthOptions} currentSelector={strength} setSelector={setStrength} />
                </View>
            ) : (
                <View />
            )}

            <FlatList
                data={pourAmountArray}
                renderItem={({item}) => <IndividualPourAmount data={item.data} id={item.id} alignment={alignment} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default PourAmountView