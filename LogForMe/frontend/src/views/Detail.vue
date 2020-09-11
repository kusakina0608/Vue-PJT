<template>
  <div>
      <div class="w-50 ml-auto mr-auto mt-5 shadow p-3">
          <div class="h1 text-center">{{post.title}}</div>
          <div>
              <div v-if="post.updatedAt" class="mt-2 text-right">{{post.updatedAt}}</div>
              <div v-id="post.file" class="download mt-3 text-right text-primary" @click="download(post.file)">
                  {{post.file}}
              </div>
              <b-form-textarea disabled class="bg-white mt-3" id="textarea-rows" v-model="post.content"></b-form-textarea>
          </div>
      </div>
    <div class="small" v-if="datacollection">
      <line-chart :chart-data="datacollection"></line-chart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "../utils/LineChart";

export default {
    components:{
        LineChart
    },
    data(){
        return {
            datacollection: null,
            post: {},
            chartData: [],
            arr: []
        };
    },
    async mounted(){
        const {id} = this.$route.params;
        const {data} = await axios.get(`http://localhost:8000/api/post/${id}`);
        this.post = data.post;
        if(data.log){
            const newArr = data.log.split("&&&&").reduce((acc, cur) => {
                console.log("cur.trim().split(\"__\"): ", cur.trim().split("__"));
                if(cur){
                    acc.push(cur.trim().split("__"))
                    console.log(new Date(cur.trim().split("__")[0]).getHours());
                }
                return acc;
            }, []);
            this.arr = newArr;
            console.log("this.arr: ", this.arr)
            const datasets = [
                {
                    label: "에러 발생 시각",
                    backgroundColor: "#f87979",
                    data: newArr.map(li => new Date(li[0]).getHours())
                }
            ];
            this.chartData = datasets;
            console.log("차트데이터: ", this.chartData);
            this.fillData();
        }
    },
    methods: {
        renameFile(data){
            const fileName = `${data.split("&&")[0]}.${data.split("&&")[1].split(".")[1]}`;
            return fileName;
        },
        async download(file){
            const res = await axios({
                method: "GET",
                url: "http://localhost:8000/api/download",
                responseType: "blob",
                params: {
                    fileName: file
                }
            });
            console.log(res);
            let blob = new Blob([res.data], {type: res.headers["content-type"]});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file);
            document.body.appendChild(link);
            link.click();
        },
        fillData () {
            this.datacollection = {
                // labels: 날짜
                // 에러 발생 시각    
                labels: this.arr.map(li => new Date(li[0]).getDate() + "일" + new Date(li[0]).getHours() + "시"),
                datasets: this.chartData
            }
        }
    }
}
</script>

<style>

</style>