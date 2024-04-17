import { deleteAll, readOptions, readAllPrograms, readProgram, readAllSched, readSched} from '../api/Schedule';
import { scheduleModel, scheduleItemModel, optionsModel, optionModel, allScheduleModel } from '../models/Schedule';

export const deleteAllOptions = async (): Promise<Array<optionModel> | any> => {
  try {
    const response = await deleteAll();
    console.log('Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete schedule: ${error.message}`);
  }
}

export const readAllOptions = async (): Promise<{ allSchedules: Array<optionModel> } | any> => {
  try {
    const response = await readOptions();

    if (Array.isArray(response.schedules)) {
      const allSchedules: optionModel[] = response.schedules.map((schedule: optionsModel) => ({
        _id: schedule._id,
        options: schedule.options,
        programs: schedule.programs,
      }));

    return { allSchedules };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all schedules: ${error.message}`);
  }
}

export const readAllProgram = async (getID: string): Promise<{ allSchedules: Array<scheduleModel> } | any> => {
  try {
    const schedule: optionsModel = { _id: getID };
    const response = await readAllPrograms(schedule);

    if (response && response.schedule.programs) { // Change this line to use 'programs'
      const allSchedules: scheduleModel[] = response.schedule.programs.map((program: scheduleModel) => ({
        _id: program._id,
        program: program.program,
        major: program.major, // This should work if 'major' exists in the original data
        year: program.year,
        semester: program.semester,
        block: program.block,
        sched: program.sched
      }));

      return { allSchedules };
    } else {
      console.error('Invalid response format.');
    }
  } catch (error: any) {
    console.error(`Failed to read schedule: ${error.message}`);
  }
};


export const readSingleProgram = async (getID: string, getProgramID: string ): Promise<scheduleModel | any> => {
  try {
    const scheduleid: scheduleModel = { _id: getID };
    const programid: scheduleModel = { _id: getProgramID };
    const response: scheduleModel = await readProgram(scheduleid, programid);

    const _id = response._id;
    const program = response.program;
    const major = response.major;
    const year = response.year; //response.schedule.year
    const semester = response.semester;
    const block = response.block;
    const sched = response.sched;

    return { _id, program, major, year, semester, block, sched };

  } catch (error: any) {
    console.error(`Failed to read schedule: ${error.message}`);
  }
};

export const readAllSchedule = async (getID: string, getProgramID: string ): Promise<scheduleItemModel | any> => {
  try {
    const scheduleid: scheduleItemModel = { _id: getID };
    const programid: scheduleItemModel = { _id: getProgramID };
    const response = await readAllSched(scheduleid, programid);

    if (response && response.sched) { // Change this line to use 'programs'
      const allSchedules: scheduleItemModel[] = response.sched.map((program: scheduleItemModel) => ({
         _id: program._id,
         courseCode: program.courseCode,
         courseDescription: program.courseDescription, //response.schedule.year
         courseUnit: program.courseUnit,
         day: program.day,
         time: program.time,
         room: program.room,
         instructor: program.instructor,
      }));

      return { allSchedules };
    } else {
      console.error('Invalid response format.');
    }

  } catch (error: any) {
    console.error(`Failed to read schedule: ${error.message}`);
  }
};

export const readSchedule = async (getID: string, getProgramID: string, getSchedID: string ): Promise<scheduleItemModel | any> => {
  try {
    const scheduleid: scheduleItemModel = { _id: getID };
    const programid: scheduleItemModel = { _id: getProgramID };
    const schedId: scheduleItemModel = { _id: getSchedID };
    const response: scheduleItemModel = await readSched(scheduleid, programid, schedId);

    const _id = response._id;
    const courseCode = response.courseCode;
    const courseDescription = response.courseDescription; //response.schedule.year
    const courseUnit = response.courseUnit;
    const day = response.day;
    const time = response.time;
    const room = response.room;
    const instructor = response.instructor;

    return { _id, courseCode, courseDescription, courseUnit, day, time, room, instructor };

  } catch (error: any) {
    console.error(`Failed to read schedule: ${error.message}`);
  }
};