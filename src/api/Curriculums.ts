import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData, addCourseData } from './endpoints/Curriculums';
import { curriculumCourseModel, curriculumCoursesModel, curriculumModel, curriculumsModel } from '../models/Curriculums';

const baseUrl = 'http://ec2-3-27-173-249.ap-southeast-2.compute.amazonaws.com:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;
const addCourseDataURL = `${baseUrl}${addCourseData}`;

export const readAllCurriculumsData = async (): Promise<AxiosResponse<curriculumsModel> | any> => {
    const response: AxiosResponse<curriculumsModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Curriculum Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readCurriculumData = async (curriculumData: curriculumModel): Promise<AxiosResponse<curriculumsModel> | any> => {
  
    const id = curriculumData._id
    const url = `${readDataURL}${id}`;

    const response = await axios.get<curriculumsModel>(url);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Curriculum Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const createCurriculumData = async (curriculumData: curriculumModel): Promise<AxiosResponse<curriculumModel> | any> => {
    const response: AxiosResponse<curriculumModel> = await axios.post(createDataURL, curriculumData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
};

export const updateCurriculumData = async (curriculumData: curriculumModel): Promise<AxiosResponse<curriculumModel> | any> => {
    const id = curriculumData._id
    const url = `${updateDataURL}${id}`;
    const response: AxiosResponse<curriculumModel> = await axios.put(url, curriculumData);

    if(response.status === 200) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Curriculum not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteCurriculumData = async (curriculumData: curriculumModel): Promise<AxiosResponse<curriculumModel> | any> => {
    const id = curriculumData._id
    const url = `${deleteDataURL}${id}`;
    const response = await axios.delete(url);

    if(response.status === 204) {
        return response.data;
    } else if(response.status === 404){
        throw new Error (`Curriculum not found: ${response.status}`);
    }else{
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllCourseData = async (curriculumData: curriculumModel): Promise<AxiosResponse<curriculumCoursesModel> | any> => {
    const curriculumId = curriculumData._id;
    const url = `${readDataURL}curriculum/${curriculumId}/courses`;
    const response: AxiosResponse<curriculumCoursesModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.curriculum;
        
    } else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readCourseData = async (curriculumData: curriculumModel, courseData: curriculumCourseModel): Promise<AxiosResponse<curriculumsModel> | any> => {
    const curriculumId = curriculumData._id
    const courseCode = courseData._id
    const url = `${readDataURL}curriculum/${curriculumId}/course/${courseCode}`;
    const response: AxiosResponse<curriculumsModel> = await axios.get(url);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Curriculum Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const addCoursesData = async (curriculumData: curriculumModel, courseData: curriculumCourseModel): Promise<AxiosResponse<curriculumsModel> | any> => {
    const curriculumId = curriculumData._id
    const url = `${addCourseDataURL}${curriculumId}`;
    const response: AxiosResponse<curriculumModel> = await axios.post(url, courseData);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const updateCourseData = async (curriculumData: curriculumModel, courseData: curriculumCourseModel): Promise<AxiosResponse<curriculumCoursesModel> | any> => {
    const curriculumId = curriculumData._id
    const courseId = courseData._id
    const url = `${updateDataURL}curriculum/${curriculumId}/course/${courseId}`;
    const response: AxiosResponse<curriculumCoursesModel> = await axios.put(url, courseData);
    
    if (response.status === 200) {
        return response.data.curriculum;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteCourseData = async (curriculumData: curriculumModel, courseData: curriculumCourseModel): Promise<AxiosResponse<curriculumCoursesModel> | any> => {
    const curriculumId = curriculumData._id
    const courseId = courseData._id
    const url = `${deleteDataURL}curriculum/${curriculumId}/course/${courseId}`;
    const response: AxiosResponse<curriculumCoursesModel> = await axios.delete(url);
    
    if (response.status === 200) {
        return response.data.curriculum;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};