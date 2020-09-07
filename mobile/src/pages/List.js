import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, Text, Alert } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import utils from '../services/utils';
 
export default function List(){
    const [ techs, setTechs ] = useState([]);

    useEffect(() =>{
        console.log('aki')
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio(utils.serverURL(), {
                query: { user_id }
            })
            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' } `)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then( storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        }) 
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView>
                {techs.map( tech => <SpotList key={tech} tech={tech} />)}        
             </ScrollView>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginBottom: 30,
        },
        logo: {
            height: 32, 
            resizeMode: "contain",
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 10,
        }
})