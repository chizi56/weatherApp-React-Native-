import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '../utils/index'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherInfo({currentWeather}) {
    const {
        main: {temp},
        weather: [details],
        name
    } = currentWeather
    
    const {icon, main, description} = details
    
    const iconURL = `http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo} >

            <Text style={styles.weatherDescription}>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconURL}} />
            <Text style={{color: temp > 0 ? PRIMARY_COLOR : 'blue', fontSize: 40}}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: "center",
    },
    weatherDescription: {
        textTransform: 'capitalize',
        color: '#191970'
    },
    weatherIcon: {
        height: 100,
        width: 100,
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
})
