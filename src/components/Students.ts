import { readStudentData, createStudentData, updateStudentData, deleteStudentData, readAllStudentsData, readAllCourseData, readCourseData, addCoursesData, updateCourseData, deleteCourseData } from '../api/Students';
import { studentModel, studentsModel, studentCourseModel, studentCoursesModel } from '../models/Students';


export const readAllStudents = async (): Promise<{ allStudents: Array<studentsModel> } | any> => {
  try {
    const response = await readAllStudentsData();

    if (Array.isArray(response.students)) {
      const allStudents: studentsModel[] = response.students.map((student: studentModel) => ({
        _id: student._id,
        program: student.program,
        year: student.year,
        semester: student.semester,
        block: student.block,
        courses: student.courses
      }));

    return { allStudents };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all students: ${error.message}`);
  }
}

export const readStudent = async (getID: string): Promise<studentModel | any> => {
  try {
    const student: studentModel = { _id: getID };
    const response: studentModel = await readStudentData(student);

    const _id = response._id;
    const program = response.program;
    const year = response.year; //response.student.year
    const semester = response.semester;
    const block = response.block;
    const courses = response.courses;

    return { _id, program, year, semester, block, courses };
    


  } catch (error: any) {
    console.error(`Failed to read student: ${error.message}`);
  }
};

export const createStudent = async (
  getProgram: string, 
  getYear: string, 
  getSemester: string, 
  getBlock: string, 
  getCourses: any) => {
  const newStudent: studentModel = {
    program: getProgram,
    year: getYear,
    semester: getSemester,
    block: getBlock,
    courses: getCourses
  };
  try {
    const response = await createStudentData(newStudent);
    console.log(`Student created successfully:`, response.student);
    return response.student;
  } catch (error: any) {
    console.error(`Failed to create student: ${error.message}`);
  }
};

export const updateStudent = async (
  getID: string, 
  getProgram: string, 
  getYear: string, 
  getSemester: 
  string, 
  getBlock: string, 
  getCourses: any) => {
  const newStudent: studentModel = {
    _id: getID,
    program: getProgram,
    year: getYear,
    semester: getSemester,
    block: getBlock,
    courses: getCourses
  };
  try {
    const response = await updateStudentData(newStudent);
    console.log(`Student update successfully:`, response.students);
    return response.students;

  } catch (error: any) {
    console.error(`Failed to update student: ${error.message}`);
  }
};

export const deleteStudent = async (getID: string) => {
  const newStudent: studentModel = {
    _id: getID
  };
  try {
    const response = await deleteStudentData(newStudent);
    console.log('Student Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete student: ${error.message}`);
  }
};

export const readAllStudentCourses = async (getID: string): Promise<Array<studentCoursesModel> | any> => {
  try {
    const student: studentModel = { _id: getID };
    const response = await readAllCourseData(student);

    if (Array.isArray(response)) {
      const allCourses: studentCourseModel[] = response.map((course: studentCourseModel) => ({
        _id: course._id, 
        code: course.code,
        description: course.description,
        units: course.units,
        type: course.type
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

export const readStudentCourse = async (getStudentID: string, getCourseCourse: string): Promise<studentCourseModel | any> => {
  try {
    const student: studentModel = { _id: getStudentID };
    const course: studentModel = { _id: getCourseCourse };
    const response = await readCourseData(student, course);

    const _id = response.course._id;
    const code = response.course.code;
    const description = response.course.description; 
    const units = response.course.units;
    const type = response.course.type;

    return { _id, code, description, units, type };

  } catch (error: any) {
    console.error(`Failed to read all courses: ${error.message}`);
  }
}

export const addStudentCourse = async (getStudentID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const student: studentModel = { _id: getStudentID };
  const newCourse: studentCourseModel = {
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  try {
    const response = await addCoursesData(student, newCourse);
    console.log(`Student created successfully:`, response);
    return response.student;
  } catch (error: any) {
    console.error(`Failed to delete student: ${error.message}`);
  }
};

export const updateStudentCourse = async (getStudentID: string, getID: string, getCode: string, getDescription: string, getUnits: string, getType: string) => {
  const student: studentModel = { _id: getStudentID };
  const newCourse: studentCourseModel = {
    _id: getID,
    code: getCode,
    description: getDescription,
    units: getUnits,
    type: getType
  };
  
  try {
    const response: studentCourseModel[] = await updateCourseData(student, newCourse);
    
    if (response.length > 0) {
      const updatedCourse = response.find(course => course._id === getID);

      if (updatedCourse) {
        console.log(`Course update successfully:`, updatedCourse);
        return updatedCourse
      } else {
        console.log(`Updated course not found.`);
      }
    } else {
      console.log(`No courses found for the student.`);
    }

    
  } catch (error: any) {
    console.error(`Failed to update course: ${error.message}`);
  }
};

export const deleteStudentCourses = async (getStudentID: string, getCourseId: string): Promise<studentCourseModel | null> => {
  const student: studentModel = { _id: getStudentID };
  const course: studentModel = { _id: getCourseId };

  try {
    const deletedCourse: studentCourseModel | null = await deleteCourseData(student, course);

    console.log('Course Deleted!', deletedCourse);
    return deletedCourse;
    
  } catch (error: any) {
    console.error(`Failed to delete course: ${error.message}`);
    throw error; // Re-throw the error to let the caller handle it
  }
};
