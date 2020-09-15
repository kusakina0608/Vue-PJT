import axios from "axios";

const request = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "bc1db2058ee79a68eba79b137eaf2356",
        language: "ko-KR"
    }
});

export const movieAPI = {
    nowPlaying: () => request.get("/movie/now_playing"),
    popular: () => request.get("/movie/popular"),
    topRated: () => request.get("/movie/top_rated"),
    upComing: () => request.get("/movie/upcoming"),
    movieDetail: (id) => request.get(`/movie/${id}`, {
        params: {append_to_response: "videos"}
    }),
    search: (keyword) => request.get(`/search/movie`, {
        params: {
            query: keyword
        }
    }),
}