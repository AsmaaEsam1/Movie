import axios from 'axios';
import Movie from '../api/Movie';
import {
    fetchData, fetchSuccess, fetchError, fetchGenres, fetchDetails, fetchCredits
} from './Action'

export const apiCall = (url) => dispatch => {
    dispatch(fetchData());
    return new Promise(async () => {
        await Movie.get(url + "?api_key=055101a3b0f4f872fa64022c41fa8d57").then(response => {
            dispatch(fetchSuccess(response.data.results))

        }).catch(error => {
            dispatch(fetchError(error))
        })
    })
}

export const apigenres = () => dispatch => {
    dispatch(fetchData());
    return new Promise(async () => {
        await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=055101a3b0f4f872fa64022c41fa8d57").
            then(response => {
                dispatch(fetchGenres(response.data.genres))
            }).catch(error => {
                dispatch(fetchError(error))
                console.log(error);
            })
    })
}
export const apidetails = (id) => dispatch => {
    dispatch(fetchData());
    return new Promise(async () => {
        await Movie.get(id + "?api_key=055101a3b0f4f872fa64022c41fa8d57").
            then(response => {
                dispatch(fetchDetails(response.data))
                console.log(response.data.cast)
            }).catch(error => {
                dispatch(fetchError(error))
                console.log(error);
            })
    })
}
export const apiCredits = (id, url) => dispatch => {
    dispatch(fetchData());
    return new Promise(async () => {
        await Movie.get(id + url + "?api_key=055101a3b0f4f872fa64022c41fa8d57").
            then(response => {
                dispatch(fetchCredits(response.data.cast))
            }).catch(error => {
                dispatch(fetchError(error))
                console.log(error);
            })
    })
}