import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitPicker from './components/UnitPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';


const API_KEY = '1872d77cab137522f7832f54df79505a';
const URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('metric')
  useEffect(() => {
    load()
  }, [unitSystem])
  

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted'){
        setErrorMessage('You need to give permission to work with app');
        return
      }
      const location = await Location.getCurrentPositionAsync();
      const {latitude,longitude} = location.coords;
      const weatherURL = `${URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${API_KEY}`;
      const response = await fetch(weatherURL);
      const result = await response.json();
      if (response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }
    } catch (error) {
        setErrorMessage(error.message)
    }
  }
 
  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem} />
      </View>
    );
  }else if(errorMessage){
    return (
            <View style={styles.container}>
                
                <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
  }
  else{
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#ff304f' />
        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
