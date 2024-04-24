import { readStudentData, createStudentData, updateStudentData, deleteStudentData, readAllStudentsData } from '../api/Students';
import { studentModel, studentsModel } from '../models/Students';


export const readAllStudents = async (): Promise<{ allStudents: Array<studentsModel> } | any> => {
  try {
    const response = await readAllStudentsData();

    if (Array.isArray(response.students)) {
      const allStudents: studentsModel[] = response.students.map((student: studentModel) => ({
        _id: student._id,
        program: student.program,
        major: student.major,
        year: student.year,
        semester: student.semester,
        block: student.block,
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
    const major = response.major;
    const year = response.year; 
    const semester = response.semester;
    const block = response.block;

    return { _id, program, major, year, semester, block };
    


  } catch (error: any) {
    console.error(`Failed to read student: ${error.message}`);
  }
};

export const createStudent = async (
  getProgram: string, 
  getMajor: string,
  getYear: string, 
  getSemester: string, 
  getBlock: string) => {
  const newStudent: studentModel = {
    program: getProgram,
    major: getMajor,
    year: getYear,
    semester: getSemester,
    block: getBlock,
  };
  try {
    const response = await createStudentData(newStudent);
    console.log(`Student created successfully:`, response.student);
    return response.student;
  } catch (error: any) {
    console.error(`Failed to delete student: ${error.message}`);
  }
};

export const updateStudent = async (
  getID: string, 
  getProgram: string, 
  getMajor: string,
  getYear: string, 
  getSemester: string, 
  getBlock: string) => {
  const newStudent: studentModel = {
    _id: getID,
    program: getProgram,
    major: getMajor,
    year: getYear,
    semester: getSemester,
    block: getBlock
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
