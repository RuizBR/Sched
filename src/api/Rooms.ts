
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData } from './endpoints/Rooms';
import { roomModel, roomsModel } from '../models/Rooms';

const baseUrl = 'http://192.168.1.9:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;

export const readAllRoomsData = async (): Promise<AxiosResponse<roomsModel> | any> => {
    const response: AxiosResponse<roomsModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Room Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readRoomData = async (roomData: roomModel): Promise<AxiosResponse<roomsModel> | any> => {
  
    const id = roomData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<roomsModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Room Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createRoomData = async (roomData: roomModel): Promise<AxiosResponse<roomModel> | any> => {
    const response: AxiosResponse<roomModel> = await axios.post(createDataURL, roomData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateRoomData = async (roomData: roomModel): Promise<AxiosResponse<roomModel> | any> => {
    const id = roomData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<roomModel> = await axios.put(url, roomData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Room not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteRoomData = async (roomData: roomModel): Promise<AxiosResponse<roomModel> | any> => {
    const id = roomData._id
    const url = `${deleteDataURL}${id}`;
    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Room not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};