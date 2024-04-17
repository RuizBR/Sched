
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData } from './endpoints/Courses';
import { courseModel, coursesModel } from '../models/Courses';

const baseUrl = 'http://192.168.1.9:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;

export const readAllCoursesData = async (): Promise<AxiosResponse<coursesModel> | any> => {
    const response: AxiosResponse<coursesModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Course Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readCourseData = async (courseData: courseModel): Promise<AxiosResponse<coursesModel> | any> => {
  
    const id = courseData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<coursesModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Course Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createCourseData = async (courseData: courseModel): Promise<AxiosResponse<courseModel> | any> => {
    const response: AxiosResponse<courseModel> = await axios.post(createDataURL, courseData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateCourseData = async (courseData: courseModel): Promise<AxiosResponse<courseModel> | any> => {
    const id = courseData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<courseModel> = await axios.put(url, courseData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Course not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteCourseData = async (courseData: courseModel): Promise<AxiosResponse<courseModel> | any> => {
    const id = courseData._id
    const url = `${deleteDataURL}${id}`;
    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Course not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};