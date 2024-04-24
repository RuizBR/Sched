
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData, loginData } from './endpoints/Users';
import { userModel, usersModel } from '../models/Users';

const baseUrl = 'http://ec2-3-27-173-249.ap-southeast-2.compute.amazonaws.com:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;
const loginDataURL = `${baseUrl}${loginData}`;


export const readAllUsersData = async (): Promise<AxiosResponse<usersModel> | any> => {
    const response: AxiosResponse<usersModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No User Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readUserData = async (userData: userModel): Promise<AxiosResponse<usersModel> | any> => {
  
    const id = userData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<usersModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No User Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createUserData = async (userData: userModel): Promise<AxiosResponse<userModel> | any> => {
    const response: AxiosResponse<userModel> = await axios.post(createDataURL, userData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateUserData = async (userData: userModel): Promise<AxiosResponse<userModel> | any> => {
    const id = userData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<userModel> = await axios.put(url, userData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`User not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteUserData = async (userData: userModel): Promise<AxiosResponse<userModel> | any> => {
    const id = userData._id
    const url = `${deleteDataURL}${id}`;
    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`User not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const loginUserData = async (userData: userModel): Promise<AxiosResponse<userModel> | any> => {
    const username = userData.username
    const password = userData.password

    const url = `${loginDataURL}?username=${username}&password=${password}`
    const response = await axios.get(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No User Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
}