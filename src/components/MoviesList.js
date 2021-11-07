import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment/min/moment-with-locales.min'

const window = Dimensions.get('window')

const MoviesList = ({ data, genres, baseImgUrl, size }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            keyExtractor={result => result.id}
            renderItem={({ item }) => {
                return (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', {
                            id: item.id,
                        })}>
                            <View style={styles.CardView}>
                                <Image style={styles.image} source={{
                                    uri: `${baseImgUrl}/${size}` + item.poster_path
                                }} />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ width: '100%', color: '#000', fontSize: 14, fontWeight: '500' }}>{item.original_title}</Text>
                                    <Text style={{ color: '#000', fontSize: 13 }}> {moment(item.release_date).format('ll').toUpperCase()}</Text>
                                    <FlatList
                                        numColumns={2}
                                        data={item.genre_ids}
                                        style={{ justifyContent: 'space-between', flex: 1 }}
                                        keyExtractor={result => result.id}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={styles.GenresView}>
                                                    {genres.map(g => g.id == item ?
                                                        <Text style={{ color: '#000', fontSize: 13 }}> {g.name}</Text> : null
                                                    )}
                                                </View>
                                            )
                                        }} />
                                    <Text style={{ color: '#27A523', fontWeight: 'bold', fontSize: 15, alignSelf: 'flex-end' }}> {item.vote_average * 10}%</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    CardView: {
        width: window.width - 40,
        alignSelf: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        paddingBottom: 10,
        marginTop: 10,
        borderBottomColor: '#D6DED5',
        borderBottomWidth: 1
    },
    GenresView: {
        backgroundColor: '#E4E6E8',
        flexDirection: 'row',
        borderRadius: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 5
    },
    image: {
        width: 90,
        height: 120,
        borderRadius: 20,
        marginBottom: 5,
        backgroundColor: '#fff',
    },
})

export default MoviesList;