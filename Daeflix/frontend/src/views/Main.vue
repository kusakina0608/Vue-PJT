<template>
  <div>
      <div class="d-flex flex-wrap" v-if="nowPlaying">
            <MovieText :text="'Now Playing'"></MovieText>
            <MovieList :movieList="nowPlaying"></MovieList>
            <MovieText :text="'Popular'"></MovieText>
            <MovieList :movieList="popular"></MovieList>
            <MovieText :text="'Coming Soon'"></MovieText>
            <MovieList :movieList="upComing"></MovieList>
      </div>
  </div>
</template>

<script>
import {movieAPI} from "../utils/axios";
import MovieList from "../components/MovieList"
import MovieText from "../components/MovieText"
import { mapMutations } from 'vuex';
export default {
    components:{
        MovieList,
        MovieText
    },
    data(){
        return {
            nowPlaying: [],
            popular: [],
            upComing: []
        }
    },
    created(){
        this.SET_LOADING(true);
    },
    async mounted(){
        try {
            const { nowPlaying, popular, upComing } = movieAPI;
            const requestArr = [nowPlaying, popular, upComing];
            const [now, pop, up] = await Promise.all(
                requestArr.map((li) => li().then((res) => {
                    return res.data.results;
                }))
            );
            this.nowPlaying = now;
            this.popular = pop;
            this.upComing = up;
            this.SET_LOADING(false);
            console.log(this.nowPlaying);
        }catch(error){
            alert("데이터가 존재하지 않습니다.");
        }
    },
    methods:{
        ...mapMutations(["SET_LOADING"])
    }
}
</script>

<style>
.movie-card{
    margin: 12px;
    width: 125px;
    font-size: 12px;
    font-weight: 400;
}
.movie-card:hover{
    opacity: 0.5;
    cursor: pointer;
}
.movie-title{
    color: #ffffff;
}
.movie-date{
    color: #ffffff;
}
.movie-card img{
    height: 180px;
    border-radius: 8px;
}
.movie-information {
    margin-top: 7px;
}
.movie-data{
    font-size: 10px;
    margin-top: 5px;
    color: #cccccc;
}
</style>