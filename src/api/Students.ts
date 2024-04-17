
import axios, { AxiosResponse } from 'axios';
import { createData, readData, updateData, deleteData, addCourseData } from './endpoints/Students';
import { studentCourseModel, studentCoursesModel, studentModel, studentsModel } from '../models/Students';
import { courseModel } from '../models/Courses';

const baseUrl = 'http://192.168.1.9:3000';

const readDataURL = `${baseUrl}${readData}`;
const createDataURL = `${baseUrl}${createData}`;
const updateDataURL = `${baseUrl}${updateData}`;
const deleteDataURL = `${baseUrl}${deleteData}`;
const addCourseDataURL = `${baseUrl}${addCourseData}`;

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

export const readAllCourseData = async (studentData: studentModel): Promise<AxiosResponse<studentCoursesModel> | any> => {
    const studentId = studentData._id;
    const url = `${readDataURL}student/${studentId}/courses`;
    const response: AxiosResponse<studentCoursesModel> = await axios.get(url);
    
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.courses;
        
    } else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readCourseData = async (studentData: studentModel, courseData: studentCourseModel): Promise<AxiosResponse<studentsModel> | any> => {
    const studentId = studentData._id
    const courseCode = courseData._id
    const url = `${readDataURL}student/${studentId}/course/${courseCode}`;
    const response: AxiosResponse<studentsModel> = await axios.get(url);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const addCoursesData = async (studentData: studentModel, courseData: studentCourseModel): Promise<AxiosResponse<studentsModel> | any> => {
    const studentId = studentData._id
    const url = `${addCourseDataURL}${studentId}`;
    const response: AxiosResponse<courseModel> = await axios.post(url, courseData);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const updateCourseData = async (studentData: studentModel, courseData: studentCourseModel): Promise<AxiosResponse<studentCoursesModel> | any> => {
    const studentId = studentData._id
    const courseId = courseData._id
    const url = `${updateDataURL}student/${studentId}/course/${courseId}`;
    const response: AxiosResponse<studentCoursesModel> = await axios.put(url, courseData);
    
    if (response.status === 200) {
        return response.data.courses;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const deleteCourseData = async (studentData: studentModel, courseData: studentCourseModel): Promise<AxiosResponse<studentCoursesModel> | any> => {
    const studentId = studentData._id
    const courseId = courseData._id
    const url = `${deleteDataURL}student/${studentId}/course/${courseId}`;
    const response: AxiosResponse<studentCoursesModel> = await axios.delete(url);
    
    if (response.status === 200) {
        return response.data.courses;
        
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};
