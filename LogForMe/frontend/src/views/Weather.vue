<template>
  <div>
      <div class="mt-5 ml-auto mr-auto shadow" style="height: 90vh;" id="map" ref="map"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            address: [
                {name: "서울/경기", latitude: 37.56638, longitude: 126.977902},
                {name: "강원도", latitude: 38.069442, longitude: 128.170699},
                {name: "충청북도", latitude: 36.984607, longitude: 128.365431},
                {name: "충청남도", latitude: 36.815116, longitude: 127.113745},
                {name: "전라북도", latitude: 35.82408, longitude: 127.147958},
                {name: "전라남도", latitude: 34.81089, longitude: 126.391914},
                {name: "경상북도", latitude: 35.944943, longitude: 128.728501},
                {name: "경상남도", latitude: 35.227597, longitude: 128.682366},
                {name: "제주도", latitude: 33.383293, longitude: 126.259003},
            ],
            weatherInfo: []
        };
    },
    methods:{
        matchIcon(weatherData){
            if(weatherData === "Clear") return require("../assets/039-sun.png");
            else if(weatherData === "Clouds") return require("../assets/001-cloud.png");
            else if(weatherData === "Rain") return require("../assets/003-rainy.png");
            else if(weatherData === "Snow") return require("../assets/006-snowy.png");
            else if(weatherData === "Thunderstorm") return require("../assets/008-storm.png");
            else if(weatherData === "Drizzle") return require("../assets/031-snowflake.png");
            else if(weatherData === "Atmosphere") return require("../assets/033-hurricane.png");
            else{
                return require("../assets/033-hurricane.png");
            }
        },
        initMap(){
            const mapContainer = this.$refs.map;
            const mapOption = {
                center: new kakao.maps.LatLng(34.99, 127.4),
                level: 13
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);
            const positions = this.weatherInfo.map((li) => {
                console.log(new kakao.maps.LatLng(li.coord.lat, li.coord.lon));
                return {
                    title: li.name,
                    latLng: new kakao.maps.LatLng(li.coord.lat, li.coord.lon),
                    temp: (li.main.temp - 273.15).toFixed(2),
                    weather: li.weather[0].main
                }
            });
            console.log(positions);
            for(let i=0; i<positions.length; i++){
                const content = `
                    <div class="label">
                        <img src=${this.matchIcon(positions[i].weather)} style="width:50px;">
                        <div class="bg-primary text-white p-1" style="border-radius: 8px;">
                            ${positions[i].temp}
                        </div>
                    </div>
                `;
                console.log(positions[i].latLng);
                const customOverlay = new kakao.maps.CustomOverlay({
                    position: positions[i].latLng ,
                    content: content
                });
                customOverlay.setMap(map);
                console.log("customOverlay: ", customOverlay);
            }
        }
        // By geographic coordinates: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4609f8493fd6a67f012a4d90b6bfd762`
        // APIKEY: 4609f8493fd6a67f012a4d90b6bfd762
    },
    async mounted(){
        const responseData = await Promise.all(
            this.address.map((li) => {
                return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${li.latitude}&lon=${li.longitude}&appid=4609f8493fd6a67f012a4d90b6bfd762`)
            })
        );
        this.weatherInfo = responseData.map(li => li.data);
        console.log(this.weatherInfo);
        if(window.kakao && window.kakao.maps){
            this.initMap();
        }else{
            const script = document.createElement("script");
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3c6d350793a5238ef1119f30920625e";
            document.head.appendChild(script);
        }
    }
}
</script>

<style>

</style>