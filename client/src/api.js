
import axios from 'axios'

const URL = "http://localhost:3000"



export async function getAllEntries() {
    const response = await axios.get(`${URL}/entries`)
    if (response.status === 200){
        return response.data
    }else{
        return
    }
}

export async function getOneEntry(id) {
    const response = await axios.get(`${URL}/entries/${id}`)
    if (response.status === 200){
        return response.data
    }else{
        return
    }
}

export async function createOneEntry(object) {
    const response = await axios.post(`${URL}/entries`,object)
    return response
}

export async function UpdateOneEntry(id,object) {
    const response = await axios.put(`${URL}/entries/${id}`,object)
    return response
}

export async function DeleteOneEntry(id) {
    const response = await axios.delete(`${URL}/entries/${id}`)
    return response

}
