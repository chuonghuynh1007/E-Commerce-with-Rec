// import http from "./axiosClient";

import axios from "axios";

const BASE_URL = 'https://pbl-6-2nd-shop-k348.vercel.app';

class DataService {
    login(data) {
        return axios.post(BASE_URL + "/user/login", data);
    }

    signin(data) {
        return axios.post(BASE_URL +  "/user/signin", data);
    }

    getCart(id) {
        return axios.get(BASE_URL + `/bill/cart/${id}`);
    }

    addCart(data) {
        return axios.post(BASE_URL + "/bill/addCart", data);
    }

    delCart(id) {
        return axios.delete(BASE_URL + `/bill/delCart/${id}`);
    }

    getAllProd() {
        return axios.get(BASE_URL + "/product/allProd", );
    }

    addProduct(data) {
        return axios.all([
            axios.post(BASE_URL + "/product/addProd", data.text), 
            axios.post(BASE_URL + "/product/addProdImg", data.imgData)
        ])

    }

    delProduct(id) {
        return axios.delete(BASE_URL + `/product/delProd/${id}`);
    }

    description(id) {
        return axios.get(BASE_URL + `/product/description/${id}`);
    }

    getByCate(cate) {
        return axios.get(BASE_URL + `/product/getByCate?category=${cate}`);
    }
}

export default new DataService();

