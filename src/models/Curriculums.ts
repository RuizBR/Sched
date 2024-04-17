export interface curriculumCourseModel{
    _id?: string;
    code?: string;
    description?: string;
    units?: string;
    type?: string;
  }

export interface curriculumCoursesModel{
    curriculum?: curriculumCourseModel
  }

export interface curriculumModel {
  _id?: string;
  program?: string;
  major?: string;
  year?: string;
  semester?: string;
  curriculum?: curriculumCourseModel;
}
export interface curriculumsModel {
  curriculum: curriculumModel;
}