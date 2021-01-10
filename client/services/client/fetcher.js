import fetch from 'isomorphic-fetch'
const BASE_URL = 'http://localhost:3001'

const apiRequest = async (url, method, authorization, request = {})=>{
    try{
        
        url = `${BASE_URL}/${url}`

        request.headers = { authorization, 'Content-Type' : 'application/json' }
        request.method = method

        let res = await fetch(url, request)

        res = await res.json()
        
        return res

    }catch(e){

        console.log(e)

    }
}

let get = async (url, authorization, request) =>{
    return await apiRequest(url, 'get', authorization, request)
} 

let post = async(url, authorization, record) =>{
    return await apiRequest(url, 'post', authorization, { body : JSON.stringify(record) })
}

const put = async(url, authorization, record) =>{
    return await apiRequest(url, 'put', authorization, { body : JSON.stringify(record) })
}

const deleteRequest = async (url, authorization, request) =>{
    return await apiRequest(url, 'delete', authorization, request)
} 

const fetcher = {
    get,
    post : post,
    put,
    delete : deleteRequest
}

export default fetcher