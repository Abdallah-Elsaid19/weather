import AsyncStorage from "@react-native-async-storage/async-storage";


export async function storeData(key, value) {
  try{
    await AsyncStorage.setItem(key , value)
  } catch(e){
    console.log('Error storing value: ', e);
  }
}

export async function getData(key) {
  try{
    await AsyncStorage.getItem(key)
  } catch(e){
    console.log('Error storing value: ', e);
  }
}