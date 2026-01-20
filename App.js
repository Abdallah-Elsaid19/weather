import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import "./global.css";
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App() {
  const queryClient = new QueryClient();
  return (
  <>
     <QueryClientProvider client={queryClient}>
     <SafeAreaProvider>
    <HomeScreen />
    </SafeAreaProvider>
    </QueryClientProvider>
  </>
  );
}


