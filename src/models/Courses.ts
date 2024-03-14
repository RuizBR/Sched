export interface courseModel {
    _id?: string;
    code?: string,
    description?: string,
    units?: string,
    type?: string
};

export interface coursesModel {
  course: courseModel;
}