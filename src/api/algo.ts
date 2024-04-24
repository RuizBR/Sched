import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://ec2-3-27-173-249.ap-southeast-2.compute.amazonaws.com:5000/activate_csp_algorithm';

export const fetchData = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(baseUrl);

    // Check the status code and handle the response accordingly
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Fetching Unsuccessful: ${response.status}`); 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};