<template>
  <div>
    <b-form @submit.prevent="signUp" class="w-50 ml-auto mr-auto mt-5">
      <b-form-group
      id="form-group-email" 
      label="아이디(이메일)" 
      label-for="form-group-email" 
      :invalid-feedback="invalidEmail" 
      :valid-feedback="validEmail" 
      :state="emailState" 
      description="이메일은 로그인 시에만 사용되며 다른 사용자에게 공개되지 않습니다."
      label-cols="4">
        <b-form-input id="input-email"
        v-model="form.email" 
        type="email" 
        placeholder="이메일 입력"
        required>
        </b-form-input>
      </b-form-group>
      <b-form-group 
      id="form-group-password" 
      label="비밀번호" 
      label-for="form-group-password"
      label-cols="4">
        <b-form-input 
        id="input-password" 
        v-model="form.password" 
        type="password"
        placeholder="비밀번호(숫자, 영문, 특수문자 조합 최소 8자)"
        required ></b-form-input>
      </b-form-group>
      <b-form-group 
      id="form-group-password-check" 
      label="비밀번호 확인" 
      label-for="form-group-password-check"
      :invalid-feedback="invalidPassword" 
      :valid-feedback="validPassword" 
      :state="passwordState" 
      label-cols="4">
        <b-form-input id="input-password-check" 
        v-model="passwordChk" 
        type="password" 
        placeholder="비밀번호 확인"
        required>
        </b-form-input>
      </b-form-group>
      <b-form-group 
      id="form-group-name" 
      label="이름" 
      label-for="form-group-name"
      label-cols="4">
        <b-form-input 
        id="input-name" 
        v-model="form.name"
        placeholder="이름을 입력하세요"
        required>
        </b-form-input>
      </b-form-group>
      <div class="mt-5 d-flex justify-content-center">
        <b-button type="submit" variant="primary" :disabled="!emailState || !passwordState || form.name.length === 0">회원가입</b-button>
        <b-button type="reset" variant="danger" class="ml-3">초기화</b-button>
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
          password: '',
          name: '',
        },
        passwordChk: '',
      }
    },
    computed:{
      emailState() {
        if(this.form.email.includes('@') && this.form.email.split('@')[1].includes('.')){
          return true;
        }
        else{
          return false;
        }
      },
      passwordState() {
        if(this.passwordChk.length>0 && 
        this.form.password.search(/[a-z]/ig)>=0 && 
        this.form.password.search(/[0-9]/g)>=0 && 
        this.form.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)>=0 &&
        this.form.password === this.passwordChk){
          return true;
        }
        else{
          return false;
        }
      },
      invalidEmail() {
        if (!this.form.email.includes('@')) {
          return '이메일 형식이 올바르지 않습니다'
        } else {
          return '이메일을 입력해주세요'
        }
      },
      validEmail() {
        return this.emailState === true ? '사용 가능한 이메일입니다.' : ''
      },
      invalidPassword() {
        if(this.form.password.length === 0){
          return '　';
        }else{
          let pwdMsg = '';
          if(this.form.password.search(/[a-z]/ig)<0){
            pwdMsg += '영문자'
          }
          if(this.form.password.search(/[0-9]/g)<0){
            if(pwdMsg) pwdMsg += ', '
            pwdMsg += '숫자'
          }
          if(this.form.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)<0){
            if(pwdMsg) pwdMsg += ', '
            pwdMsg += '특수문자'
          }
          if(pwdMsg) return '비밀번호에 ' + pwdMsg + "를 포함시켜주세요."
          if(this.passwordChk.length === 0){
            return '　';
          } else if (this.form.password != this.passwordChk) {
            return '비밀번호가 일치하지 않습니다.'
          }
        }
      },
      validPassword() {
        return this.passwordState === true ? '비밀번호가 일치합니다.' : ''
      }
    },
    methods: {
      async signUp(e){
        // e.preventDefault();
        const {email, password, name} = this.form;
        if(!email){
          alert("이메일을 입력해주세요");
        }else if(!password){
          alert("비밀번호를 입력해주세요");
        }else if(!name){
          alert("이름을 입력해주세요");
        }else{
          try {
            const {data} = await axios.post(`${BASE_URL}/api/user`, {
              email, password, name
            });
            if(data.signUp){
              alert("회원가입이 완료되었습니다.");
              this.$router.push("/login");
            }
          } catch(error){

          }
        }
      }
    }
  }
</script>
<style>

</style>