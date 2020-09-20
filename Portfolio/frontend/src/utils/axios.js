import axios from "axios";

const request = axios.create({
    // baseURL: "http://220.87.38.37:8000"
    baseURL: "http://localhost:8000"
});

export const adminAPI = {
    loginAdmin: (email, password) => {
        return request.post("/admin/login", {
            email,
            password
        })
    }
}

export const portfolioAPI = {
    post: (formData) => {
        return request.post("/portfolio", formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
    },
    getFile: (src) => {
        return request.get("/portfolio/images", {
            params: {
                src: src
            },
            responseType: "blob"
        })
    },
    getList: () => {
        return request.get("/portfolio")
    }
}