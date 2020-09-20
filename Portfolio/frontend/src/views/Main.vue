<template>
  <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
    <b-carousel-slide v-for="(img,index) in imageList" :key="index">
      <template v-slot:img>
        <div class="d-flex align-items-center" style="width: 100%; height: 100vh; overflow: hidden; background-color: white;">
          <img class="d-block w-100 img-placement" style="width: 100%; height: 100vh; background-size: cover;" v-bind:src="img.image">
          <div class="carousel-caption d-none d-md-block h-50">
            <h1 style="font-family: 'Nanum Gothic', sans-serif;" v-for="txt in img.text" :key="txt.id">{{txt}}</h1><br> 
          </div>
        </div>
      </template>
    </b-carousel-slide>
  </b-carousel>  
</template>

<script>
export default {
  data(){
    return {
      slide: 0,
      sliding: null,
      imageList: [
        { image: require("../assets/slide1.jpg"), text: ["저는 SSAFY C반 출신 개발자 이대진입니다."]},
        { image: require("../assets/slide2.jpg"), text: ["저는 항상 최고가 되기 위해 최선을 다합니다."]},
        { image: require("../assets/slide3.jpg"), text: ["저의 능력을 발휘하여", "사회에 공헌하는 개발자가 되고 싶습니다."]}
      ]
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  }
}
</script>

<style>
.img-placement {
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>