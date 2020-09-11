<template>
  <div>
    <b-form @submit.prevent="login" class="w-50 ml-auto mr-auto mt-5">
      <b-form-group
        id="input-group-1"
        label="아이디(이메일)"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="이메일을 입력하세요"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="비밀번호" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="비밀번호를 입력하세요"
        ></b-form-input>
      </b-form-group>
      <div class="mt-5 d-flex justify-content-center">
        <b-button class="w-100" type="submit" variant="primary">로그인</b-button>
        <b-button @click="signup" class="w-100" type="button" variant="success">회원가입</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { BASE_URL } from "@/components/common/BaseURL.vue";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login(){
        const {email, password} = this.form;
        if(email && password){
            const {data} = await axios.post(`${BASE_URL}/api/login`, {
                email, password
            });
            console.log(data);
            if(data.login){
                // 로그인 정보를 유지한다. => 세션을 활용
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("name", data.name);
                // vuex 활용
                this.$store.commit("SET_LOGIN_DATA", data.id);
                this.$store.commit("SET_USER_NAME", data.name);
                console.log(this.$store.state.loginData);
                // 메인페이지로 이동한다.
                this.$router.push("/");
            }else{
              alert("로그인 정보가 일치하지 않습니다.");
            }
        }
    },
    signup(){
      this.$router.push("/signup");
    }
  }
}
</script>
<style>

</style>