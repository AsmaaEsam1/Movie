import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { apiCall, apigenres } from '../redux/ActionCreators'
import MoviesList from "../components/MoviesList";
import NetInfo from "@react-native-community/netinfo";
import { NoInternetModal } from '../components/NoInternetModal'
const Movies = () => {
    const title1 = 'upcoming'
    const title2 = 'popular'
    const title3 = 'top_rated'
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiReducer.data)
    const genres = useSelector((state) => state.apiReducer.genres)
    const loading = useSelector((state) => state.apiReducer.loading);
    const [defaultTitle, setDefaultTitle] = useState(title1)
    const [isOffline, setOfflineStatus] = useState(false);
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500"

    const CheckConnectivity = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                setOfflineStatus(false)
            } else {
                setOfflineStatus(true)
            }
        });
    };

    useEffect(() => {
        CheckConnectivity()
        try {
            dispatch(apiCall('/' + title1))
        } catch (error) {
            console.log(error)
        }

    }, [])
    useEffect(() => {
        try {
            dispatch(apiCall('/' + defaultTitle))
            dispatch(apigenres())
        } catch (error) {
            console.log(error)
        }
    }, [defaultTitle])

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Movies</Text>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => setDefaultTitle(title1)}>
                    <View style={[styles.TextView, { backgroundColor: defaultTitle === title1 ? '#27A523' : '#EAECEE' }]}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: defaultTitle === title1 ? '#fff' : '#000' }}>Upcoming</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDefaultTitle(title2)}>
                    <View style={[styles.TextView, { backgroundColor: defaultTitle === title2 ? '#27A523' : '#EAECEE' }]}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: defaultTitle === title2 ? '#fff' : '#000' }}>Popular</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDefaultTitle(title3)}>
                    <View style={[styles.TextView, { backgroundColor: defaultTitle === title3 ? '#27A523' : '#EAECEE' }]}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: defaultTitle === title3 ? '#fff' : '#000' }}>Top Rated</Text>
                    </View>
                </TouchableOpacity>

            </View>

            {isOffline ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#555',
                        marginTop: 14,
                        textAlign: 'center',
                        alignSelf: 'center',
                    }}>
                        Oops! Looks like your device is not connected to the Internet.
                    </Text>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#27A523" />
                    ) : (
                        <MoviesList data={data} genres={genres} baseImgUrl={baseImgUrl} size={size} />
                    )}
                </View>
            )}
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        margin: 20
    },
    headerView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    TextView: {
        borderRadius: 20,
        height: 40,
        width: 110,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

});
export default Movies