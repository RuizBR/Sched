export interface studentModel{
  _id?: string,
  program?: string;
  major?: string;
  year?: string;
  semester?: string;
  block?: string;
};

export interface studentsModel {
  student?: studentModel;
}