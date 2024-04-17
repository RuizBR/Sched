
import axios, { AxiosResponse } from 'axios';
import { deleteAllData, readData, readSchedData } from './endpoints/Schedule';
import { allScheduleModel, optionsModel as optionModel, optionsModel, scheduleItemModel, scheduleModel } from '../models/Schedule';

const baseUrl = 'http://192.168.1.9:3000';

const readDataURL = `${baseUrl}${readData}`;
const deleteAllDataURL = `${baseUrl}${deleteAllData}`;
const readScheduleData = `${baseUrl}${readSchedData}`;

export const deleteAll = async (): Promise<any> => {
    const response = await axios.delete(deleteAllDataURL);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Student Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
}

export const readOptions = async (): Promise<AxiosResponse<optionModel> | any> => {
    const response: AxiosResponse<optionModel> = await axios.get(readDataURL);
    
    if (response.status === 200) {
        return response.data;
        
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllPrograms = async (scheduleData: scheduleModel): Promise<AxiosResponse<allScheduleModel> | any> => {
    const id = scheduleData._id;
    const url = `${readDataURL}${id}`;

    try {
        const response = await axios.get<allScheduleModel>(url);
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

export const readProgram = async (scheduleData: optionModel, programData: scheduleModel): Promise<AxiosResponse<scheduleModel> | any> => {
    const id = scheduleData._id
    const program = programData._id
    const url = `${readDataURL}${id}/${program}`;

    const response = await axios.get<scheduleModel>(url);
    

    if (response.status === 200) {
        console.log(response.data)
        return response.data;
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readAllSched = async (scheduleData: optionModel, programData: scheduleItemModel): Promise<AxiosResponse<scheduleItemModel> | any> => {
    const id = scheduleData._id
    const program = programData._id
    const url = `${readDataURL}${id}/${program}`;

    const response = await axios.get<scheduleModel>(url);

    if (response.status === 200) {
        return response.data.program;
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};

export const readSched = async (scheduleData: optionModel, programData: scheduleModel, schedData: scheduleItemModel): Promise<AxiosResponse<scheduleItemModel> | any> => {
    const id = scheduleData._id
    const program = programData._id
    const sched = schedData._id
    const url = `${readScheduleData}${id}/${program}/${sched}`;

    const response = await axios.get<scheduleModel>(url);

    if (response.status === 200) {
        return response.data.sched;
    } else if (response.status === 404) {
        throw new Error(`No Schedule Found`);
    } else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
};