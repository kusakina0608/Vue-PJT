<template>
  <div class="post-container">
    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3 bg-primary text-white h3">{{title}}</div>
        <!-- {{roomData}} -->
        <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
          <b-carousel-slide v-for="(img,index) in imageList" :key="index">
            <template v-slot:img>
              <div class="d-flex align-items-center" style="width: 1180px; height: 700px; overflow: hidden; background-color: white;">
                <img class="d-block img-fluid w-100" style="width: auto; height: auto;" v-bind:src="img.image">
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <div class="text-center border-bottom p-3">{{content}}</div>
      </div>
    </PostComponent>
    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">옵션</div>
        <div class="d-flex">
          <b-form-checkbox-group class="w-100" v-model="selectedOptions" :options="options" buttons button-variant="primary" size="lg" name="buttons-2" onclick="return false;">
          </b-form-checkbox-group>
        </div>
      </div>
    </PostComponent>
    <PostComponent>
      <div slot="posting">
        <div class="text-center border-bottom p-3">위치</div>
        <div class="d-flex" style="height: 700px;">
          <div ref="map" class="h-100 flex-container border-left" style="flex:5">지도</div>
        </div>
      </div>
    </PostComponent>
  </div>
</template>

<script>
import PostComponent from "../components/PostComponent";
import { postAPI } from '../utils/axios';
export default {
    components: {
        PostComponent
    },
    data(){
        return {
            slide: 0,
            sliding: null,
            title: "",
            content: "",
            address: "",
            latitude: "",
            longitude: "",
            selectedOptions: [],
            options: [
                {
                text: "세탁기",
                value: "세탁기"
                },
                {
                text: "냉장고",
                value: "냉장고"
                },
                {
                text: "침대",
                value: "침대"
                },
                {
                text: "티비",
                value: "티비"
                }
            ],
            imageList: []
        }
    },
    async mounted(){
        const addressScript = document.createElement("script");
        addressScript.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(addressScript);
        const mapScript = document.createElement("script");
        mapScript.onload =() => kakao.maps.load();
        mapScript.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3c6d350793a5238ef1119f30920625e&libraries=services";
        document.head.appendChild(mapScript);
        // console.log(this.$route.params);
        const {id} = this.$route.params;
        const {data} = await postAPI.getDetail(id);
        // console.log(data);
        const {title, content, address, latitude, longitude, Options, Images} = data.room;
        this.title = title;
        this.content = content;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.selectedOptions = Options;
        console.log(Options);
        for(const li of Images){
            const res = await postAPI.getFile(li.src);
            const blob = new Blob([res.data], {
                type: res.headers["content-type"]
            });
            this.imageList.push({...li, image:window.URL.createObjectURL(blob)});
        }
        console.log("옵션들: ", Options);
        for(const li of Options){
            if(!li.length){
                this.selectedOptions.push(li.item);
            }
        }
        console.log(this.selectedOptions);
        let mapOption = {
            center: new daum.maps.LatLng(latitude, longitude),
            level: 6
        };
        const mapContainer = this.$refs.map;
        const map = new daum.maps.Map(mapContainer, mapOption);
        let geocoder = new daum.maps.services.Geocoder();
        geocoder.addressSearch(address, (results, status) => {
          if(status === daum.maps.services.Status.OK){
            console.log(results);
            const {y, x, address_name} = results[0];
            console.log(y, x, address_name);
            let coords = new daum.maps.LatLng(y, x);
            mapContainer.style.display = "block";
            map.relayout();
            map.setLevel(4);
            map.setCenter(coords);
            let marker = new daum.maps.Marker({
              position: coords,
              map: map
            })
          }
        })
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        getImageURL(src){
            console.log(request.responseURL);
            return request.responseURL;
        }
    }
}
</script>

<style>

</style>