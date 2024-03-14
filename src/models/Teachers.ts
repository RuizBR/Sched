export interface teacherCourseModel{
    _id?: string;
    code?: string;
    description?: string;
    units?: string;
    type?: string;
  }

export interface teacherCoursesModel{
    specialized?: teacherCourseModel
  }

export interface teacherModel {
  _id?: string;
  name?: string;
  specialized?: teacherCourseModel;
}
export interface teachersModel {
  teacher?: teacherModel;
}