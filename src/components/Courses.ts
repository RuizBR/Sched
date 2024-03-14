import { readCourseData, createCourseData, updateCourseData, deleteCourseData, readAllCoursesData } from '../api/Courses';
import { courseModel, coursesModel } from '../models/Courses';


export const readAllCourses = async (): Promise<{ allCourses: Array<coursesModel> } | any> => {
  try {
    const response = await readAllCoursesData();

    if (Array.isArray(response.courses)) {
      const allCourses = response.courses.map((course: courseModel) => ({
        _id: course._id,
        code: course.code,
        description: course.description,
        units: course.units,
        type: course.type,
      }));

    return { allCourses };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const readCourse = async (getID: string): Promise<coursesModel | any> => {
  try {
    const course: courseModel = { _id: getID };
    const response: coursesModel = await readCourseData(course);

    const _id = response.course._id;
    const code = response.course.code;
    const description = response.course.description;
    const units = response.course.units;
    const type = response.course.type;

    return { _id, code, description, units, type };
    


  } catch (error: any) {
    console.error(`Failed to read course: ${error.message}`);
  }
};

export const createCourse = async (getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const newCourse: courseModel = {
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType,
  };
  try {
    const response = await createCourseData(newCourse);
    console.log(`Course created successfully:`, response);
    return response.course;
  } catch (error: any) {
    console.error(`Failed to delete course: ${error.message}`);
  }
};

export const updateCourse = async (getID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const newCourse: courseModel = {
    _id: getID,
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType,
  };
  try {
    const response = await updateCourseData(newCourse);
    console.log(`Course update successfully:`, response);
    return response.courses;

  } catch (error: any) {
    console.error(`Failed to update course: ${error.message}`);
  }
};

export const deleteCourse = async (getID: string) => {
  const newCourse: courseModel = {
    _id: getID
  };
  try {
    const response = await deleteCourseData(newCourse);
    console.log('Course Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete course: ${error.message}`);
  }
};
