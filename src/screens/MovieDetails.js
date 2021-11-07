import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { apidetails, apiCredits } from '../redux/ActionCreators'
const window = Dimensions.get('window')

const MovieDetails = ({ route, navigation }) => {
    const { params } = route
    const { id } = params
    const dispatch = useDispatch()
    const details = useSelector((state) => state.apiReducer.details)
    const credits = useSelector((state) => state.apiReducer.credits)
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500"
    const getResult = async (id) => {
        console.log(id)
        try {
            dispatch(apidetails(`/${id}`))
            dispatch(apiCredits(`/${id}`, '/credits'))
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        getResult(id)
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        style={{ margin: 20 }}
                        name="arrow-back"
                        color="#000"
                        size={22}
                    />
                </TouchableOpacity>
                <View style={{ width: window.width, alignItems: 'center' }}>
                    <Image style={{ width: 170, height: 230, borderRadius: 20, marginBottom: 20 }} source={{ uri: `${baseImgUrl}/${size}` + details.poster_path }} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>{details.original_title}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#27A523' }}>{details.vote_average * 10}%</Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Overview</Text>
                    <Text style={{ fontSize: 13, color: '#000' }}>{details.overview}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Genres</Text>
                    <FlatList
                        numColumns={2}
                        data={details.genres}
                        keyExtractor={result => result.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.GenresView}>
                                    <Text style={{ color: '#000', fontSize: 15 }}>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Credits</Text>
                    <FlatList
                        horizontal
                        data={credits}
                        keyExtractor={result => result.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginRight: 10, alignItems: 'center' }}>
                                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: `${baseImgUrl}/${size}` + item.profile_path }} />
                                    <Text style={{ color: '#000', fontSize: 13 }}>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    GenresView: {
        backgroundColor: '#E4E6E8',
        flexDirection: 'row',
        borderRadius: 20,
        marginRight: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
});
export default MovieDetails