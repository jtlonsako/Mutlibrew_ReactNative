import { View, SafeAreaView, ScrollView, StyleSheet, Platform, StatusBar } from 'react-native'
import { Slot, usePathname } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BrewTypeDropdown from '@/components/BrewTypeDropdown'
import { useSQLiteContext } from 'expo-sqlite'
import { getBrewTypes } from '@/lib/database'

const BrewLayout = () => {

  function cleanupPathname(pathname: string) {
    const capitalized = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
    return capitalized;
  }

  const db = useSQLiteContext();
  const [brewTypes, setBrewTypes] = useState([]);
  let pathname = usePathname();
  pathname = cleanupPathname(pathname);

    useEffect(() => {
      async function fetchData() {
        try {
          const result = await getBrewTypes();
          setBrewTypes(result);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    }, [])
    
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.AndroidSafeArea} className="min-h-screen bg-zinc-800">
        <ScrollView contentContainerStyle={{width: '100%'}} showsVerticalScrollIndicator={false}>
          <View className="items-center">
              <BrewTypeDropdown brewTypes={brewTypes} currentPath={pathname} />
              <View className="mb-5" />
              <Slot />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
    <StatusBar barStyle="light-content" />    
    </>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0
}})

export default BrewLayout