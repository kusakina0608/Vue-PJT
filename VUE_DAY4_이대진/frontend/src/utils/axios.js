import axios from "axios";

const request = axios.create({
    baseURL: "http://220.87.38.37:8000"
});

export const userAPI = {
    registerUser: (email, password, name) => {
        return request.post("/user", {
            email: email,
            password: password,
            name: name
        })
    },
    loginUser: (email, password) => {
        return request.post("/user/login", {
            email,
            password
        })
    }
}

export const sellerAPI = {
    registerSeller: (email, password, name) => {
        return request.post("/seller", {
            email: email,
            password: password,
            name: name
        })
    },
    loginSeller: (email, password) => {
        return request.post("/seller/login", {
            email,
            password
        })
    }
}

export const postAPI = {
    post: (formData) => {
        return request.post("/post", formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
    },
    getFile: (src) => {
        return request.get("/post/images", {
            params: {
                src: src
            },
            // 바이너리 라지 오브젝트, 이미지, 사운드, 비디오 등 멀티미디어 데이터를 다룰 때
            responseType: "blob"
        })
    },
    getList: (searchKeyword = "") => {
        return request.get("/post", {
            params:{
                searchKeyword: searchKeyword
            }
        })
    },
    getDetail: (roomId) => {
        return request.get(`/post/${roomId}`);
    }
}