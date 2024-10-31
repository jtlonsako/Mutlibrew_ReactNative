import { openDB } from "@/lib/database"
import { Stack } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { useCallback, useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "ShareTechMono": require("../assets/fonts/ShareTechMono-Regular.ttf"),
        "Roboto": require("../assets/fonts/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf"),
        "RobotoBold": require("../assets/fonts/static/RobotoSerif-SemiBold.ttf"),
        "RobotoLight": require("../assets/fonts/static/RobotoSerif-Light.ttf"),
        "Playfair": require("../assets/fonts/static/PlayfairDisplay-Regular.ttf"),
        "PlayfairMedium": require("../assets/fonts/static/PlayfairDisplay-Medium.ttf"),
        "PlayfairBold": require("../assets/fonts/static/PlayfairDisplay-Bold.ttf")
      })

      useEffect(() => {
        if(error) throw error;

        if(fontsLoaded) SplashScreen.hideAsync();
      }, [fontsLoaded, error])

      if(!fontsLoaded && !error) return null

    return (
        <SQLiteProvider databaseName="database.db" onInit={openDB}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="(brew)" options={{headerShown: false}} />
            </Stack>
        </SQLiteProvider>
    )
}

export default RootLayout