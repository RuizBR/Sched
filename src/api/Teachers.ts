import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData, addCourseData } from './endpoints/Teachers';
import { teacherCourseModel, teacherCoursesModel, teacherModel, teachersModel } from '../models/Teachers';

const baseUrl = 'http://ec2-3-27-173-249.ap-southeast-2.compute.amazonaws.com:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;
const addCourseDataURL = `${baseUrl}${addCourseData}`;

export const readAllTeachersData = async (): Promise<AxiosResponse<teachersModel> | any> => {
    const response: AxiosResponse<teachersModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readTeacherData = async (teacherData: teacherModel): Promise<AxiosResponse<teachersModel> | any> => {
  
    const id = teacherData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<teachersModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createTeacherData = async (teacherData: teacherModel): Promise<AxiosResponse<teacherModel> | any> => {
    const response: AxiosResponse<teacherModel> = await axios.post(createDataURL, teacherData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateTeacherData = async (teacherData: teacherModel): Promise<AxiosResponse<teacherModel> | any> => {
    const id = teacherData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<teacherModel> = await axios.put(url, teacherData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Teacher not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteTeacherData = async (teacherData: teacherModel): Promise<AxiosResponse<teacherModel> | any> => {
    const id = teacherData._id
    const url = `${deleteDataURL}${id}`;
    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Teacher not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllCourseData = async (teacherData: teacherModel): Promise<AxiosResponse<teacherCoursesModel> | any> => {
    const teacherId = teacherData._id;
    const url = `${readDataURL}teacher/${teacherId}/courses`;
    const response: AxiosResponse<teacherCoursesModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.specialized;
        
    } else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readCourseData = async (teacherData: teacherModel, courseData: teacherCourseModel): Promise<AxiosResponse<teachersModel> | any> => {
    const teacherId = teacherData._id
    const courseCode = courseData._id
    const url = `${readDataURL}teacher/${teacherId}/course/${courseCode}`;
    const response: AxiosResponse<teachersModel> = await axios.get(url);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const addCoursesData = async (teacherData: teacherModel, courseData: teacherCourseModel): Promise<AxiosResponse<teachersModel> | any> => {
    const teacherId = teacherData._id
    const url = `${addCourseDataURL}${teacherId}`;
    const response: AxiosResponse<teacherModel> = await axios.post(url, courseData);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const updateCourseData = async (teacherData: teacherModel, courseData: teacherCourseModel): Promise<AxiosResponse<teacherCoursesModel> | any> => {
    const teacherId = teacherData._id
    const courseId = courseData._id
    const url = `${updateDataURL}teacher/${teacherId}/course/${courseId}`;
    const response: AxiosResponse<teacherCoursesModel> = await axios.put(url, courseData);
    
    if (response.status === 200) {
        return response.data.specialized;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteCourseData = async (teacherData: teacherModel, courseData: teacherCourseModel): Promise<AxiosResponse<teacherCoursesModel> | any> => {
    const teacherId = teacherData._id
    const courseId = courseData._id
    const url = `${deleteDataURL}teacher/${teacherId}/course/${courseId}`;
    const response: AxiosResponse<teacherCoursesModel> = await axios.delete(url);
    
    if (response.status === 200) {
        return response.data.specialized;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};