<template>
  <div class="sort-center h-auto">
    <div class="h3 bg-primary p-4 text-white w-100 text-center">Portfolio</div>
    <div class="row row-cols-1 row-cols-md-4 g-4 m-5">
      <div class="col mt-2" v-for="project in portfolio" :key="project.id">
        <div class="card">
          <img :src="project.imgURL" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{project.title}}</h5>
            <p class="card-text">{{project.contents}}</p>
          </div>
          <a :href="project.githubURL" target="_blank" class="btn btn-primary">Github Repository</a>
        </div>
      </div>
      <div v-if="loginData.id" class="col mt-2">
        <div class="card">
          <div v-if="uploadFile" class="file-close-button" @click="fileDeleteButton" :name="uploadFile.number">x</div>
          <img v-if="uploadFile" :src="uploadFile.preview" class="card-img-top" alt="...">
          <div v-else class="image-box">
            <label for="file">일반 사진 등록</label>
            <input type="file" id="file" ref="files" @change="imageUpload">
          </div>
          <div class="card-body">
            <input type="text" v-model="title" class="form-control mb-3" placeholder="Title" aria-label="Title" aria-describedby="title">
            <input type="text" v-model="contents" class="form-control" placeholder="Contents" aria-label="Contents" aria-describedby="contents">
          </div>
          <input type="text" v-model="githubURL" class="form-control" placeholder="Github repository" aria-label="Github repository" aria-describedby="gitrepo">          
          <a @click="addNewPortfolio" target="_blank" class="btn btn-primary">Add Portfolio</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import {portfolioAPI} from "../utils/axios"
export default {
  data(){
    return {
      portfolio: [],
      uploadFile: "",
      title: "",
      contents: "",
      githubURL: ""
    }
  },
  computed:{
    ...mapState(["modal", "loginData"])
  },
  async mounted(){
    const {data} = await portfolioAPI.getList(this.$route.query.search);
    for(const li of data.portfolio){
      const res = await portfolioAPI.getFile(li.src);
      const blob = new Blob([res.data], {
        type: res.headers["content-type"]
      });
      this.portfolio.push({...li, imgURL: window.URL.createObjectURL(blob)});
    }
    console.log(this.portfolio);
  },
  methods: {
    imageUpload(){
      this.uploadFile = {
        file: this.$refs.files.files[0],
        preview: URL.createObjectURL(this.$refs.files.files[0]),
        number: 0
      }
    },
    fileDeleteButton(e){
      this.uploadFile = "";
    },
    async addNewPortfolio(){
      if(this.title && this.contents && this.githubURL){
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.contents);
        formData.append("image", this.uploadFile.file);
        formData.append("repository", this.githubURL);
        const {data} = await portfolioAPI.post(formData);
        location.href = "http://localhost:8080/portfolio";
      }else{
        alert("포트폴리오 제목, 내용, 저장소 URL을 입력해주세요.");
      }
    },
    async login(){
            if(this.id && this.password){
                const {data} = await adminAPI.loginAdmin(this.id, this.password);
                if(data.login){
                    sessionStorage.setItem("id", data.id);
                    sessionStorage.setItem("name", data.name);
                    this.SET_LOGIN_DATA({
                        email: data.id,
                        name: data.name
                    })
                }else{
                    alert("로그인에 실패하였습니다");
                }
            }else{
                alert("아이디 및 비밀번호를 입력해주세요.");
            }
            this.SET_LOGIN_MODAL(false);
        },
  }
}
</script>

<style>
.file-notice-item {
  margin-top: 5px;
  text-align: center;
}
.file-notice-item-red {
  color: #ef4351;
}
.image-box {
  margin-top: 30px;
  padding-bottom: 20px;
  text-align: center;
}
.image-box input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.file-preview-wrapper {
  padding: 10px;
  position: relative;
}
.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}
.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>