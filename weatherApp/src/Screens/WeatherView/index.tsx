import React, {useEffect, useState} from 'react';
import {FlatList, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #EEE
`;

const WeatherContainer = Styled(FlatList)``;

const LoadingView = Styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;
const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;

const LoadingLabel = Styled.Text`
    font-size: 16px;
`;

const WeatherItemContainer = Styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Weather = Styled.Text`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;

const Temperature = Styled.Text`
    font-size: 16px;
`;

const API_KEY = 'dc7225f441c907136b93e382f882c358';

interface IWeahter {
    temperature?: number;
    weather?: string;
    isLoading: boolean;
};

const WeatherView = () => {
    const [weatherInfo, setWeatherInfo] = useState<IWeahter>({
        temperature: undefined,
        weather: undefined,
        isLoading: false
    });

    const getCurrentWeather = () => {
        setWeatherInfo({
            isLoading:false
        });
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                console.log(latitude, longitude)
                const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                console.log(url)

                fetch(url)
                .then(res => res.json())
                .then(json => {
                    setWeatherInfo({
                        temperature:json.main.temp,
                        weather:json.weather[0].main,
                        isLoading:true
                    })
                })
                .catch(err => {
                    setWeatherInfo({
                        isLoading: true
                    })
                    showError('날씨 정보를 가져오는데 실패했습니다.')
                })
            },
            error => {
                setWeatherInfo({
                    isLoading:true
                })
                showError('위치 정보를 가져오는데 실패했습니다.')
            }
        )
    }

    const showError = (message: string): void => {
        setTimeout(() => {
            Alert.alert(message)
        }, 500)
    }

    useEffect(() => {
        getCurrentWeather();
    }, [])

    let data = [];
    const { isLoading, weather, temperature } = weatherInfo;
    if (weather && temperature) {
        data.push(weatherInfo)
    }

    return (
        <Container>
            <WeatherContainer
                onRefresh={() => getCurrentWeather()}
                refreshing={!isLoading}
                data={data}
                keyExtractor={(item, index) => {
                    return `weather-${index}`
                }}
                ListEmptyComponent={
                    <LoadingView>
                        <Loading size="large" color="#1976D2" />
                        <LoadingLabel>Loading...</LoadingLabel>
                    </LoadingView>
                }
                renderItem={({item, index}) => (
                    <WeatherItemContainer>
                        <Weather>{(item as IWeahter).weather}</Weather>
                        <Temperature>({(item as IWeahter).temperature} C)</Temperature>
                    </WeatherItemContainer>
                )}
                contentContainerStyle={{flex:1}}
            />
        </Container>
    )
}


export default WeatherView;