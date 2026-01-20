import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { useLocations, useWeather } from '../hooks/useWeather'
import { debounce } from 'lodash';
import { storeData } from '../utils/asyncStorage'

const HomeScreen = () => {
  const [showSearch,setShowSearch] = React.useState(false);
  const [city, setCity] = React.useState('Cairo');
  const [search, setSearch] = React.useState('');

  const {data , isLoading , error } = useWeather({
    cityName: city,
    days: 7,
  })

  const {data : locations } = useLocations(search)
   
  const handleSearch = useCallback(
    debounce((value)=>{
     setSearch(value)
    },1000),
    []
  )

  const handleLocation = (loc) =>{
    setCity(loc.name);
    storeData("city", loc.name);
    setSearch('');
    setShowSearch(false);
  }


  if (error) return <Text>{error}</Text>
  
  return (
    <View className='flex-1 relative '>
      <StatusBar style="light" />
      <Image blurRadius={70} source={require('../../assets/images/bg.png')} className='absolute w-full h-full' />
      <SafeAreaView className='flex flex-1 mx-7'>
        {isLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null}
        <View style={{height:'7%'}} className='mx-4 relative z-50 '>
          <View className='flex-row justify-end item-center rounded-full mt-4'>
            {showSearch ? 
            <TextInput 
             onChangeText={handleSearch}
             placeholder='Search City' placeholderTextColor={"white"}
             style={{backgroundColor: theme.bgWhite(0.2)}}
             className=' mx-4 pl-6 rounded-full flex-1 text-base text-gray-100  ' />
             : null }
             <TouchableOpacity 
               onPress={()=> setShowSearch(!showSearch)}
               style={{backgroundColor:theme.bgWhite(0.2)}}
               className='rounded-full p-3 '
               >
               {showSearch ? <XMarkIcon size="25" color="white" /> : <MagnifyingGlassIcon size="25" color="white" />}
             </TouchableOpacity>  
          </View>

        {locations?.length > 0 && showSearch && (
          <View className='absolute w-[86%] mt-2 ml-4 bg-gray-300 top-16 rounded-3xl'>
              {locations.map((loc , index) => (
                <TouchableOpacity
                 key={index}
                 onPress={() =>handleLocation(loc)}
                 className='flex-row items-center border-b px-4 py-3 border-gray-400 rounded-3xl'
                >
                <MapPinIcon size={20} color={"#007FFF"}/>
                <Text className='text-xl text-gray-700 ml-2 '>
                 {loc.name} , {loc.country}
                </Text>
                </TouchableOpacity>
              )
              )}
          </View>
        )}

        {/* {locations?.length > 0 && showSearch && (
            <View className="absolute w-[86%] mt-2 ml-4 bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLocation(loc)}
                  className="flex-row items-center p-3 px-4 border-b rounded-3xl border-gray-400">
                  <MapPinIcon size={20} color="gray" />
                  <Text className="ml-2 text-black text-lg">
                    {loc.name}, {loc.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )} */}

        </View>

        <View className=' flex-row justify-center items-center my-12'>
          <Text className='text-white text-5xl font-bold'>{data?.location?.name}</Text> 
          <Text className='text-gray-300 text-xl font-semibold mt-2'>{"  " + data?.location.country}</Text>
        </View>
        <View className='flex items-center'>
          <Image  source={{ uri: 'https:' + data?.current?.condition?.icon }} className='w-64 h-64' />
        </View>
        <View className='mt-10 mb-10 flex-row justify-center items-center'>
          <Text className='text-7xl font-bold text-white'> {data?.current?.temp_c}&#176;</Text>
        </View>
        <View className='mb-20 flex-row justify-center items-center'>
          <Text className='text-center text-white text-2xl tracking-widest'> {data?.current?.condition?.text}</Text>
        </View>

        <View className='flex-row justify-between mx-20 my-10'>
          <View className='flex-row items-center'>
           <Image source={require("../../assets/icons/wind.png")} className='w-6 h-6'/>
            <Text className='text-white text-lg font-semibold ml-2'>{data?.current?.wind_kph} km/h</Text>
          </View>
        <View className='flex-row items-center'>
           <Image source={require("../../assets/icons/drop.png")} className='w-6 h-6'/>
            <Text className='text-white text-lg font-semibold ml-2'>{data?.current?.humidity}%</Text>
          </View>
        <View className='flex-row items-center'>
           <Image source={require("../../assets/icons/sun.png")} className='w-6 h-6'/>
            <Text className='text-white text-lg font-semibold ml-2'>{data?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
          </View>
        </View>

       <View>
         <View className='flex-row items-center my-5'>
          <CalendarDaysIcon size="30" color="white" className='self-center' />
          <Text className='text-2xl ml-2 text-white'>Daily Forecast</Text>
         </View>

         <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:15}}
         >
          {data?.forecast?.forecastday?.map((item,index) => {
            let date = new Date(item.date);
            let options = { weekday : "long"};
            let dayName = date.toLocaleDateString("en-US" , options);
            dayName = dayName.split(",")[0]
            return (
            <View key={index} className='flex justify-center items-center p-5 mx-2 rounded-3xl gap-y-1' 
             style={{backgroundColor:theme.bgWhite(0.2)}}
            >
             <Image source={{ uri: 'https:' + item?.day?.condition?.icon }} className='w-24 h-24' />
             <Text className='text-white text-base'>{dayName}</Text>
             <Text className='text-white text-2xl font-bold'>{item?.day?.avgtemp_c}&#176;</Text>
            </View>
          )
          })}

         </ScrollView>
       </View>

      </SafeAreaView>
    </View>
  )
}

export default HomeScreen