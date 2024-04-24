export interface scheduleItemModel{
  _id?: string;
  courseCode?: string,
  courseDescription?: string,
  courseUnit?: string,
  day?: string,
  time?: string, 
  room?: string,
  instructor?: string,
}

export interface allScheduleItemModel{
sched?: scheduleItemModel[]
}

export interface scheduleModel{
_id?: string,
program?: string;
year?: string;
semester?: string;
major?: string;
block?: string;
sched?: scheduleItemModel;
};

export interface allScheduleModel{
programs?: scheduleModel[];
}

export interface optionsModel{
_id?: string,
options?: string,
programs?: scheduleModel;
};

export interface optionModel{
options?: optionsModel
}