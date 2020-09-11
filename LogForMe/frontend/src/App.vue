<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">Log for me</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="isLoggedIn" href="/post">글쓰기</b-nav-item>
            <b-nav-item @click="$router.push('/weather')">오늘의 날씨</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <span v-if="getUserName">{{getUserName}}님 환영합니다</span>
                <span v-else>로그인 하세요</span>
              </template>
              <div v-if="isLoggedIn">
                <b-dropdown-item @click="logout">로그아웃</b-dropdown-item>
              </div>
              <div v-else>
                <b-dropdown-item href="/login">로그인</b-dropdown-item>
                <b-dropdown-item href="/signup">회원가입</b-dropdown-item>
              </div>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName: "로그인"
    };
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.loginData;
    },
    getUserName(){
      return this.$store.state.userName;
    }
  },
  methods: {
    logout(){
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("name");
      this.$store.commit("SET_LOGIN_DATA", "");
      this.$store.commit("SET_USER_NAME", "");
      this.$router.push("/login");
    }
  },
  mounted(){
    console.log("[현재 주소] ", this.$route.path);
    if(!this.$store.state.loginData && this.$route.path !== "/login" && this.$route.path != "/signup"){
      // alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
      this.$router.push("/login");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
