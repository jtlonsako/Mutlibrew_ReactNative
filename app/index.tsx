import BrewTypeCard from '@/components/BrewTypeCard';
import { getBrewTypes } from '@/lib/database';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Platform, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  const db = useSQLiteContext();
  const [brewTypes, setBrewTypes] = useState([]);

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
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-zinc-800 items-center justify-center">
      <View className="items-center">
        <Text className="text-white font-serif text-2xl xl:text-4xl self-center">Select Brew Type</Text>
        <View className=" border-white border-y my-3 opacity-30 w-52 xl:w-64 " />

          <FlatList 
            data={brewTypes}
            renderItem={({item}) => <BrewTypeCard brewTypeName={item.name} route={item.short_name} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />

        </View>
        <StatusBar barStyle="light-content" />    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0
}})