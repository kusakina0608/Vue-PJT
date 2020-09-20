<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container p-4">
                    <div class="h4 modal-header d-flex flex-column align-items-center">
                        <div class="x-button" @click="close">✖</div>
                        <div>관리자 로그인</div>
                        <div class="w-100 mt-4">
                            <b-form-input class="p-4" placeholder="아이디" v-model="id" type="email">
                            </b-form-input>
                            <b-form-input class="mt-2 p-4" placeholder="비밀번호" type="password" v-model="password">
                            </b-form-input>
                        </div>
                        <button @click="login" class="login-button">로그인</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapMutations} from "vuex";
import {adminAPI} from "../utils/axios"
export default {
    data(){
        return {
            password: "",
            id: "",
        }
    },
    methods: {
        close(){
            this.SET_LOGIN_MODAL(false);
        },
        async login(){
            if(this.id && this.password){
                const {data} = await adminAPI.loginAdmin(this.id, this.password);
                console.log(data);
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
            location.href = "http://localhost:8080/";
        },
        ...mapMutations(["SET_LOGIN_MODAL", "SET_LOGIN_DATA"])
    }
}
</script>

<style>
.modal-mask{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    display: table;
}
.modal-wrapper{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);
}
.modal-container {
    position: relative;
    width: 420px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}
.modal0container .modal-leave-active .modal-container{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.x-button{
    position: absolute;
    right: 1rem;
    top: 1rem;
    border: 1px solid gray;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    border-radius: 50%;
    cursor: pointer;
}
.x-button:hover{
    opacity: 0.5;
}
.login-button{
    background-color: #1564f9;
    width: 100%;
    margin-top: 20px;
    border: none;
    padding: 15px;
    color: white;
    font-size: 1rem;
}
.login-button:hover{
    opacity: 0.5;
}
</style>