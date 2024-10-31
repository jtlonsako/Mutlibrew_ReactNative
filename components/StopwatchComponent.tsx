import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import RecipeRowComponent from './RecipeRowComponent'
import IndividualPourAmount from './IndividualPourAmount';

const StopwatchComponent = ({calculatedWater, calculatedGrounds, pourAmountArray = undefined }) => {
    let intervalRef: any = useRef(null);
    const [elapsedTimeInMilliseconds, setElapsedTimeInMilliseconds] = useState(0);
    const [timerIsActive, setTimerIsActive] = useState(false)
    const [elapsedTimeToDisplay, setElapsedTimeToDisplay] = useState('00:00:0');

    function startTimer() {
        if(!timerIsActive) {
            setTimerIsActive(true);
            let beginning = new Date();
            let beginningTime = beginning.getTime() - elapsedTimeInMilliseconds;
            intervalRef.current = setInterval(() => {
                const current = new Date();
                const currentTime = current.getTime();
                const currentElapsedTime = currentTime - beginningTime;
                setElapsedTimeInMilliseconds(currentElapsedTime);
                setElapsedTimeToDisplay(formatTime(currentElapsedTime));
            }, 10)
        }
    }

    function clearTimer() {
        setElapsedTimeInMilliseconds(0);
        setElapsedTimeToDisplay('00:00:0');
    }

    function stopTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimerIsActive(false);
    }

    function formatTime(milliseconds) {
        const mm = zeroPadded(Math.floor(milliseconds / 1000 / 60));
        const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
        const t = lastDigit(Math.floor(milliseconds / 100));
        return `${mm}:${ss}.${t}`;
    }

    function zeroPadded(number) {
        return number >= 10 ? number.toString() : `0${number}`;
    }
    // consider the last digit of the input number (used for the tenths of seconds)
    function lastDigit(number) {
        return number.toString()[number.toString().length - 1];
    }

  return (
    <View className="w-full flex justify-items-center">
        <RecipeRowComponent 
            coffeeAmount={calculatedGrounds}
            waterAmount={calculatedWater}
        />

        <View className="w-full justify-center mt-6 mb-8">
            <Text className="text-slate-100 text-5xl font-share text-center">{elapsedTimeToDisplay}</Text>

            <View className="flex flex-row justify-center mt-4">
                {!timerIsActive ? (
                    <TouchableOpacity onPress={startTimer} className="py-2 px-4 bg-green-800 text-base rounded-lg">
                        <Text className="text-slate-100 font-share text-lg">{elapsedTimeInMilliseconds > 0 ? 'Continue' : 'Start'}</Text>
                    </TouchableOpacity>
                    ) : (
                    <View />
                )}

                {timerIsActive ? (
                    <TouchableOpacity onPress={stopTimer} className="py-2 px-4 mx-2 bg-red-800 text-base rounded-lg">
                        <Text className="text-slate-100 font-share text-lg">Stop</Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                {!timerIsActive && elapsedTimeInMilliseconds > 0 ? (
                    <TouchableOpacity onPress={clearTimer} className="py-2 px-4 mx-2 bg-cyan-900 text-base rounded-lg">
                        <Text className="text-slate-100 font-share text-lg">Reset</Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>

            <View className="mt-8">
                {pourAmountArray !== undefined ? (
                    <FlatList
                        horizontal={true}
                        data={pourAmountArray}
                        renderItem={({item}) => <IndividualPourAmount data={item.data} id={item.id} alignment="horizontal" />}
                        contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View />
                )}
            </View>
        </View>
    </View>
  )
}

export default StopwatchComponent