import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (name,email,password) => {
    const {data} = await $host.post('api/user/registration', {name,email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email,password) => {
    const {data} = await $host.post('api/user/login', {email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    return jwt_decode(data.token)
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/getUsers')
    return data
} 

export const removeUser = async (userId) => {
    const {data} = await $authHost.post('api/user/removeUser', {userId})
    return data
}
