<template>
  <div id="app">
    <div id="nav" class="d-flex align-items-center bg-dark justify-content-between p-3 border-bottom">
      <div class="d-flex align-items-center">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span class="ml-3 h4 text-white text-decoration-none">이대진</span>
            </template>
            <div>
              <!-- <b-dropdown-item @click="$router.push('/')">Main</b-dropdown-item> -->
              <b-dropdown-item class="text-center" v-if="!loginData.id" @click="SET_LOGIN_MODAL(true)">관리자 로그인</b-dropdown-item>
              <b-dropdown-item class="text-center" v-else @click="logout">로그아웃</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
      <div class="d-flex align-items-center">
        <ul class="d-flex text-white">
          <li style="margin-left: 20px;" @click="$router.push('/')">Main</li>
          <li style="margin-left: 20px;" @click="$router.push('/about')">About</li>
          <li style="margin-left: 20px;" @click="$router.push('/skill')">Skill</li>
          <li style="margin-left: 20px;" @click="$router.push('/stack')">Stack</li>
          <li style="margin-left: 20px;" @click="$router.push('/portfolio')">Portfolio</li>
          <li style="margin-left: 20px;" @click="$router.push('/closing')">Closing</li>
        </ul>
      </div>
    </div>
    <Login v-if="modal.login"></Login>
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import Login from "./components/Login";
export default {
  components:{
    Login
  },
  computed:{
    ...mapState(["modal", "loginData"])
  },
  methods:{
    ...mapMutations(["SET_LOGIN_MODAL", "SET_LOGIN_DATA"]),
    logout(){
      this.SET_LOGIN_DATA("");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("name");
      sessionStorage.clear();
      location.href = "http://localhost:8080/";
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
body{
  font-family: 'Noto Sans KR', sans-serif !important;
}
ul{
  margin: 0 !important;
  padding: 0;
  font-weight: 400;
  list-style: none;
}
ul li:hover{
  color: #1564f9;
  cursor: pointer;
}
ul li:not(:first-child){
  margin-left: 20px;
}
.router-link-exact-active {
  color: #1564f9;
}
.router-link {
  color: #888888;
  text-decoration: none;
}
.router-link:hover{
  color: #1564f9;
  cursor: pointer;
}
</style>
