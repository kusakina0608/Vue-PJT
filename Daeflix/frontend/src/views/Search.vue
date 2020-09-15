<template>
  <div>
      <b-form @submit.prevent="onSearch">
          <b-form-input class="border-black" v-model="keyword" placeholder="영화제목을 입력하세요"></b-form-input>
      </b-form>
      <MovieText v-if="searchList" :text="'Search Result'"></MovieText>
      <MovieLists :movieList="searchList"></MovieLists>
  </div>
</template>

<script>
import MovieLists from "../components/MovieList";
import MovieText from "../components/MovieText";
import {movieAPI} from "../utils/axios";
import {mapMutations} from "vuex";
export default {
    components:{
        MovieLists,
        MovieText
    },
    data(){
        return {
            keyword: "",
            searchList: ""
        }
    },
    mounted(){
        this.SET_LOADING(false);
    },
    methods:{
        ...mapMutations(["SET_LOADING"]),
        async onSearch(){
            this.SET_LOADING(true);
            if(!this.keyword){
                alert("영화 제목을 입력하세요!");
                return;
            }
            const {data} = await movieAPI.search(this.keyword);
            this.searchList = data.results;
            this.SET_LOADING(false);
        }
    }
}
</script>

<style>

</style>