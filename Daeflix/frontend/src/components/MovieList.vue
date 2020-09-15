<template>
  <div v-if="movieList" class="d-flex flex-wrap">
          <div :key="li.id" v-for="li in movieList" class="movie-card" style="width:125px;">
              <div @click="goDetail(li.id)">
                  <b-img v-if="li.poster_path" v-bind:src="image(li.poster_path)" style="width:125px; height:180px" fluid ></b-img>
                  <b-img v-else style="width:125px; height:180px" fluid v-bind:src="noImage"></b-img>
                  <div class="movie-information">
                      <div class="movie-title">{{li.title}}</div>
                      <div class="movie-date" v-if="li.release_date">{{li.release_date.split("-")[0]}}</div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
export default {
    props: ["movieList"],
    data(){
        return {
            noImage: require("../assets/error.png")
        }
    },
    methods: {
        image(img){
            return `https://image.tmdb.org/t/p/w300/${img}`;
        },
        goDetail(id){
            this.$router.push(`detail/${id}`);
        }
    }
}
</script>

<style>

</style>