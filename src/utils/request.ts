import axios from 'axios';

let baseurl = "http://localhost:8000";


const httpService = axios.create(
    {
        baseURL:baseurl,
        timeout: 3000,
    }
);

//请求拦截器
httpService.interceptors.request.use(function (config){
    if(config.headers){
        console.log("stirage="+localStorage.getItem("token"));
        config.headers.token = localStorage.getItem("token");
    }
    return config;
},function (error){
    return Promise.reject(error);
})


//响应拦截器
httpService.interceptors.request.use(function (response){

    return response;
},function (error){
    return Promise.reject(error);
})


/*
网络请求
 */

export function get(url: string,params = {}){
    return new Promise((resolve, reject)=>{
        httpService({
            url:url,
            method:'get',
            params: params,
        }).then(response =>{
            resolve(response)
        }).catch(error=>{
            reject(error);
        })
    })
}

export function post(url: string,params = {}){
    console.log(url+"------");
    return new Promise((resolve, reject)=>{
        httpService({
            url:url,
            method:'post',
            data: params,
        }).then(response =>{
            console.log(response.request)
            console.log(response)
            resolve(response)
        }).catch(error=>{
            reject(error);
        })
    })
}

export function fileupload(url: string,params = {}){
    return new Promise((resolve, reject)=>{
        httpService({
            url:url,
            method:'get',
            params: params,
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response =>{
            resolve(response)
        }).catch(error=>{
            reject(error);
        });
    });
}

export function getServerUrl(){
    return baseurl
}
export default {
    get,
    post,
    fileupload,
    getServerUrl,
}