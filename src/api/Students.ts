
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData } from './endpoints/Students';
import { studentModel, studentsModel } from '../models/Students';

const baseUrl = 'http://ec2-54-252-208-78.ap-southeast-2.compute.amazonaws.com:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;

export const readAllStudentsData = async (): Promise<AxiosResponse<studentsModel> | any> => {
    const response: AxiosResponse<studentsModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readStudentData = async (studentData: studentModel): Promise<AxiosResponse<studentsModel> | any> => {
    const id = studentData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<studentsModel>(url);

    if (response.status === 200) {
        return response.data.student;
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createStudentData = async (studentData: studentModel): Promise<AxiosResponse<studentModel> | any> => {
    const response: AxiosResponse<studentModel> = await axios.post(createDataURL, studentData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateStudentData = async (studentData: studentModel): Promise<AxiosResponse<studentModel> | any> => {
    const id = studentData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<studentModel> = await axios.put(url, studentData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Student not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteStudentData = async (studentData: studentModel): Promise<AxiosResponse<studentModel> | any> => {
    const id = studentData._id
    const url = `${deleteDataURL}${id}`;

    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Student not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};
