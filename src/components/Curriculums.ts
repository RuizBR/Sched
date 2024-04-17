import { readCurriculumData, createCurriculumData, updateCurriculumData, deleteCurriculumData, readAllCurriculumsData, readAllCourseData, readCourseData, addCoursesData, deleteCourseData, updateCourseData } from '../api/Curriculums';
import { curriculumCourseModel, curriculumCoursesModel, curriculumModel, curriculumsModel } from '../models/Curriculums';


export const readAllCurriculums = async (): Promise<{ allCurriculums: Array<curriculumsModel> } | any> => {
  try {
    const response = await readAllCurriculumsData();

    if (Array.isArray(response.curriculums)) {
      const allCurriculums = response.curriculums.map((curriculum: curriculumModel) => ({
        _id: curriculum._id,
        program: curriculum.program,
        major: curriculum.major,
        year: curriculum.year,
        semester: curriculum.semester,
        curriculum: curriculum.curriculum
      }));

    return { allCurriculums };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all curriculums: ${error.message}`);
  }
}

export const readCurriculum = async (getID: string): Promise<curriculumsModel | any> => {
  try {
    const readCurriculum: curriculumModel = { _id: getID };
    const response: curriculumsModel = await readCurriculumData(readCurriculum);

    const _id = response.curriculum._id;
    const program = response.curriculum.program;
    const major = response.curriculum.major;
    const year = response.curriculum.year;
    const semester = response.curriculum.semester;
    const curriculum = response.curriculum.curriculum

    return { _id, program, major, year, semester, curriculum };
    


  } catch (error: any) {
    console.error(`Failed to read curriculum: ${error.message}`);
  }
};

export const createCurriculum = async (getProgram: string, getMajor: string, getYear: string, getSemester: string, getCurriculum: any) => {
  const newCurriculum: curriculumModel = {
    program: getProgram,
    major: getMajor,
    year: getYear,
    semester: getSemester,
    curriculum: getCurriculum,
  };
  try {
    const response = await createCurriculumData(newCurriculum);
    console.log(`Curriculum created successfully:`, response);
    return response.curriculum;
  } catch (error: any) {
    console.error(`Failed to delete curriculum: ${error.message}`);
  }
};

export const updateCurriculum = async (getID: string, getProgram: string, getMajor:string, getYear: string, getSemester: string, getCurriculum: any) => {
    const newCurriculum: curriculumModel = {
      _id: getID,
      program: getProgram,
      major: getMajor,
      year: getYear,
      semester: getSemester,
      curriculum: getCurriculum,
    };
    try {
        const response = await updateCurriculumData(newCurriculum);
        console.log(`Curriculum update successfully:`, response);
        return response.curriculums;

    } catch (error: any) {
        console.error(`Failed to update curriculum: ${error.message}`);
    }
};

export const deleteCurriculum = async (getID: string) => {
  const newCurriculum: curriculumModel = {
    _id: getID
  };
  try {
    const response = await deleteCurriculumData(newCurriculum);
    console.log('Curriculum Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete curriculum: ${error.message}`);
  }
};

export const readAllCurriculumCourses = async (getID: string): Promise<Array<curriculumCoursesModel> | any> => {
  try {
    const readCurriculum: curriculumModel = { _id: getID };
    const response = await readAllCourseData(readCurriculum);

    if (Array.isArray(response)) {
      const allCourses: curriculumCourseModel[] = response.map((curriculum: curriculumCourseModel) => ({
        _id: curriculum._id, 
        code: curriculum.code,
        description: curriculum.description,
        units: curriculum.units,
        type: curriculum.type
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

export const readCurriculumCourse = async (getCurriculumID: string, getCurriculumCourse: string): Promise<curriculumCourseModel | any> => {
  try {
    const readCurriculum: curriculumModel = { _id: getCurriculumID };
    const curriculum: curriculumModel = { _id: getCurriculumCourse };
    const response = await readCourseData(readCurriculum, curriculum);

    const _id = response.curriculum._id;
    const code = response.curriculum.code;
    const description = response.curriculum.description; 
    const units = response.curriculum.units;
    const type = response.curriculum.type;

    return { _id, code, description, units, type };

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const addCurriculumCourse = async (getCurriculumID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const curriculum: curriculumModel = { _id: getCurriculumID };
  const newCourse: curriculumCourseModel = {
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  try {
    const response = await addCoursesData(curriculum, newCourse);
    console.log(`Curriculum created successfully:`, response);
    return response.curriculum;
  } catch (error: any) {
    console.error(`Failed to delete curriculum: ${error.message}`);
  }
};

export const updateCurriculumCourse = async (getCurriculumID: string, getID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const curriculum: curriculumModel = { _id: getCurriculumID };
  const newCourse: curriculumCourseModel = {
    _id: getID,
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  
  try {
    const response: curriculumCourseModel[] = await updateCourseData(curriculum, newCourse);
    
    if (response.length > 0) {
      const updatedCourse = response.find(course => course._id === getID);

      if (updatedCourse) {
        console.log(`Course update successfully:`, updatedCourse);
        return updatedCourse
      } else {
        console.log(`Updated course not found.`);
      }
    } else {
      console.log(`No courses found for the curriculum.`);
    }

    
  } catch (error: any) {
    console.error(`Failed to update course: ${error.message}`);
  }
};

export const deleteCurriculumCourses = async (getCurriculumID: string, getCourseId: string): Promise<curriculumCourseModel | null> => {
  const curriculum: curriculumModel = { _id: getCurriculumID };
  const course: curriculumModel = { _id: getCourseId };

  try {
    const deletedCourse: curriculumCourseModel | null = await deleteCourseData(curriculum, course);

    console.log('Course Deleted!', deletedCourse);
    return deletedCourse;
    
  } catch (error: any) {
    console.error(`Failed to delete course: ${error.message}`);
    throw error; // Re-throw the error to let the caller handle it
  }
};
