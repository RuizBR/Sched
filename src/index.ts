
import { readAllCourses, readCourse, createCourse, updateCourse, deleteCourse } from './components/Courses';
import { addCurriculumCourse, createCurriculum, deleteCurriculum, deleteCurriculumCourses, readAllCurriculumCourses, readAllCurriculums, readCurriculum, readCurriculumCourse, updateCurriculum, updateCurriculumCourse } from './components/Curriculums';
import { createRoom, deleteRoom, readAllRooms, readRoom, updateRoom } from './components/Rooms';
import { deleteAllOptions, readAllOptions, readAllProgram, readSingleProgram, readAllSchedule, readSchedule } from './components/Schedule';
import { readAllStudents, readStudent, createStudent, updateStudent, deleteStudent } from './components/Students';
import { addTeacherCourse, createTeacher, deleteTeacher, deleteTeacherCourses, readAllTeacherCourses, readAllTeachers, readTeacher, readTeacherCourse, updateTeacher, updateTeacherCourse } from './components/Teachers';
import { readAllUsers, createUser, updateUser, deleteUser, readUser } from './components/Users'
import { courseModel } from './models/Courses';
import { curriculumCourseModel, curriculumModel } from './models/Curriculums';
import { roomModel } from './models/Rooms';
import { scheduleModel, scheduleItemModel, optionsModel } from './models/Schedule';
import {  studentModel } from './models/Students';
import { teacherCourseModel, teacherModel } from './models/Teachers';
import { userModel, usersModel } from './models/Users';


// async function sample() {
//     const data = await fetchInstructorData();
    
//     if (data !== null) {
//         data.forEach((program) => {
//             console.log(`first name: ${program.fname}, surname: ${program.sname}`);
//             console.log('Courses:');
//             program.specialized.forEach((course, index) => {
//                 console.log(`  Course ${index + 1}: ${course.code} - ${course.description}`);
//             });
//             console.log('------------------------------------');
//         });
//     } else {
//         console.error('Failed to fetch curriculum data.');
//     }
// }
// sample();


export class Users{
    async readAll() {
        const userList = await readAllUsers();

        if (userList && userList.allUsers) {
            const allUserDetails = userList.allUsers.map((user: userModel) => {
                const _id = user._id;
                const username = user.username;
                const password = user.password;
                return { _id, username, password };
        });
            return allUserDetails;

        } else {
            console.error('Failed to fetch user data or no users found.');
        }
    }

    async read(userId: string) {
        const response = await readUser(userId);
        return response
    }

    async create(getUsername: string, getPassword: string){
        const response = await createUser(getUsername, getPassword);
        return response
    }

    async update(getID: string, getUsername: string, getPassword: string){
        const response = await updateUser(getID, getUsername, getPassword);
        return response
    }

    async delete(getID: string){
        const response = await deleteUser(getID);
        return response
    }
}

export class Teachers{
    async readAll() {
        const teacherList = await readAllTeachers();

        if (teacherList && teacherList.allTeachers) {
            const allTeacherDetails = teacherList.allTeachers.map((teacher: teacherModel) => {
                const _id = teacher._id;
                const fname = teacher.fname;
                const sname = teacher.sname;
                const specialized = teacher.specialized;
                return { _id, fname, sname, specialized };
        });
            return allTeacherDetails;

        } else {
            console.error('Failed to fetch teacher data or no teachers found.');
        }
    }

    async read(teacherId: string) {
        const response = await readTeacher(teacherId);
        return response
    }

    async create(getFname: string, getSname: string, getSpecialized: any){
        const response = await createTeacher(getFname, getSname, getSpecialized);
        return response
    }

    async update(getID: string, getFname: string, getSname: string, getSpecialized: teacherCourseModel[]){
        const response = await updateTeacher(getID, getFname, getSname, getSpecialized);
        return response
    }

    async delete(getID: string){
        const response = await deleteTeacher(getID);
        return response
    }
    async readAllCourses(getID: string) {
        const courseList = await readAllTeacherCourses(getID);

        if (courseList && courseList.allCourses) {
            const allCourseDetails = courseList.allCourses.map((course: teacherCourseModel) => {
                const _id = course._id;
                const code = course.code;
                const description = course.description;
                const units = course.units;
                const type = course.type;

                return { _id, code, description, units, type };
        });
            return allCourseDetails;

        } else {
            console.error('Failed to fetch course data or no courses found.');
        }
    }

    async readCourse(getStudentID: string, getCourseCode: string){
        const response = await readTeacherCourse(getStudentID, getCourseCode);
        return response
    }

    async addCourse(getStudentID: string, getCode: string, getDescription: string, getUnits: string, getType: string){
        const response: any  = await addTeacherCourse(getStudentID, getCode, getDescription, getUnits, getType);
        return response
    }

    async updateCourse(getStudentID: string, getID: string, getCode: string, getDescription: string, getUnits: string, getType: string){
        const response = await updateTeacherCourse(getStudentID, getID, getCode, getDescription, getUnits, getType);
        return response
    }

    async deleteCourse(getStudentID: string, getCourseID: string){
        const response = await deleteTeacherCourses(getStudentID, getCourseID);
        return response
    }
}

export class Rooms{
    async readAll() {
        const roomList = await readAllRooms();

        if (roomList && roomList.allRooms) {
            const allRoomDetails = roomList.allRooms.map((room: roomModel) => {
                const _id = room._id;
                const name = room.name;
                const type = room.type;
                return { _id, name, type };
        });
            return allRoomDetails;

        } else {
            console.error('Failed to fetch room data or no rooms found.');
        }
    }

    async read(roomId: string) {
        const response = await readRoom(roomId);
        return response
    }

    async create(getName: string, getType: string){
        const response = await createRoom(getName, getType);
        return response
    }

    async update(getID: string, getName: string, getType: string){
        const response = await updateRoom(getID, getName, getType);
        return response
    }

    async delete(getID: string){
        const response = await deleteRoom(getID);
        return response
    }
}

export class Courses{
    async readAll() {
        const courseList = await readAllCourses();

        if (courseList && courseList.allCourses) {
            const allCourseDetails = courseList.allCourses.map((course: courseModel) => {
                const _id = course._id;
                const code = course.code;
                const description = course.description;
                const units = course.units;
                const type = course.type;

                return { _id, code, description, units, type };
        });
            return allCourseDetails;

        } else {
            console.error('Failed to fetch course data or no courses found.');
        }
    }

    async read(getID: string) {
        const response = await readCourse(getID);
        return response
    }

    async create(getCode: string, getDescription: string, getUnits: string, getType: string){
        const response = await createCourse(getCode, getDescription, getUnits, getType);
        return response
    }

    async update(getID: string, getCode: string, getDescription: string, getUnits: string, getType: string){
        const response = await updateCourse(getID, getCode, getDescription, getUnits, getType);
        return response
    }

    async delete(getID: string){
        const response = await deleteCourse(getID);
        return response
    }
}

export class Students{
    async readAll() {
        const studentList = await readAllStudents();

        if (studentList && studentList.allStudents) {
            const allStudentDetails = studentList.allStudents.map((student: studentModel) => {
                const _id = student._id;
                const program = student.program;
                const year = student.year;
                const semester = student.semester;
                const block = student.block;

                return { _id, program, year, semester, block };
        });
            return allStudentDetails;

        } else {
            console.error('Failed to fetch student data or no students found.');
        }
    }

    async read(getID: string) {
        const response = await readStudent(getID);
        return response
    }

    async create(
        getProgram: string, 
        getYear: string, 
        getSemester: string, 
        getMajor: string,
        getBlock: string
        ){
        const response = await createStudent(
            getProgram, 
            getYear, 
            getSemester, 
            getMajor,
            getBlock, 
            );
        return response
    }

    async update(
        getID: string, 
        getProgram: string, 
        getYear: string, 
        getSemester: string, 
        getMajor: string,
        getBlock: string
        ){
        const response = await updateStudent(
            getID,
            getProgram, 
            getYear, 
            getSemester,
            getMajor, 
            getBlock
            );
        return response
    }

    async delete(getID: string){
        const response = await deleteStudent(getID);
        return response
    }

}

export class Schedules{

    async deleteAll(){
        const response = await deleteAllOptions();
        return response
    }

    async readOptions() {
        const response = await readAllOptions();

        if (response && response.allSchedules) {
            const allresponseDetails = response.allSchedules.map((option: optionsModel) => {
                const _id = option._id;
                const options = option.options;
                const programs = option.programs;
                return { _id, options, programs };
        });
            return allresponseDetails;

        } else {
            console.error('Failed to fetch Options data or no teachers found.');
        }
    }

    async readAllPrograms(scheduleId: string) {
        const response = await readAllProgram(scheduleId);

        if (Array.isArray(response.allSchedules)) {
            const allSchedules: scheduleModel[] = response.allSchedules.map((programs: scheduleModel) => ({
              _id: programs._id,
              program: programs.program,
              year: programs.year,
              semester: programs.semester,
              block: programs.block,
              sched: programs.sched
            }));
          
            return { allSchedules };
          }
    }

    async readsingleProgram(scheduleId: string, programId: string ) {
        const response = await readSingleProgram(scheduleId,programId);
        return response
    }

    async readSchedule(scheduleId: string, programId: string) {
        const response = await readAllSchedule(scheduleId, programId);

        if (response && response.allSchedules) {
            const allresponseDetails = response.allSchedules.map((sched: scheduleItemModel) => {
                const _id = sched._id;
                const courseCode = sched.courseCode;
                const courseDescription = sched.courseDescription;
                const courseUnit = sched.courseUnit;
                const day = sched.day;
                const time = sched.time;
                const room = sched.room;
                const instructor = sched.instructor;

                return { _id, courseCode, courseDescription, courseUnit, day, time, room, instructor };
        });
            return allresponseDetails;

        } else {
            console.error('Failed to fetch schedule data or no schedule found.');
        }
    }

    async readSingleSchedule(scheduleId: string, programId: string, schedId: string) {
        const response = await readSchedule(scheduleId, programId, schedId);
        return response
    }
}

export class Curriculum{
    async readAll() {
        const curriculumList = await readAllCurriculums();

        if (curriculumList && curriculumList.allCurriculums) {
            const allCurriculumDetails = curriculumList.allCurriculums.map((Newcurriculum: curriculumModel) => {
                const _id = Newcurriculum._id;
                const program = Newcurriculum.program;
                const major = Newcurriculum.major;
                const year = Newcurriculum.year;
                const semester = Newcurriculum.semester;
                const curriculum = Newcurriculum.curriculum;
                return { _id, program, major, year, semester, curriculum };
        });
            return allCurriculumDetails;

        } else {
            console.error('Failed to fetch curriculum data or no curriculums found.');
        }
    }

    async read(curriculumId: string) {
        const response = await readCurriculum(curriculumId);
        return response
    }

    async create(getProgram: string, getYear: string, getSemester: string, getMajor: string, getCurriculum: any){
        const response = await createCurriculum(getProgram, getYear, getSemester, getMajor, getCurriculum);
        return response
    }

    async update(getID: string, getProgram: string, getYear: string, getSemester: string, getMajor: string, getCurriculum: any){
        const response = await updateCurriculum(getID, getProgram, getYear, getSemester, getMajor, getCurriculum);
        return response
    }

    async delete(getID: string){
        const response = await deleteCurriculum(getID);
        return response
    }
    async readAllCourses(getID: string) {
        const courseList = await readAllCurriculumCourses(getID);

        if (courseList && courseList.allCourses) {
            const allCourseDetails = courseList.allCourses.map((course: curriculumCourseModel) => {
                const _id = course._id;
                const code = course.code;
                const description = course.description;
                const units = course.units;
                const type = course.type;

                return { _id, code, description, units, type };
        });
            return allCourseDetails;

        } else {
            console.error('Failed to fetch course data or no courses found.');
        }
    }

    async readCourse(getCurriculumID: string, getCourseCode: string){
        const response = await readCurriculumCourse(getCurriculumID, getCourseCode);
        return response
    }

    async addCourse(getCurriculumID: string, getCode: string, getDescription: string, getUnits: string, getType: string){
        const response: any  = await addCurriculumCourse(getCurriculumID, getCode, getDescription, getUnits, getType);
        return response
    }

    async updateCourse(getCurriculumID: string, getID: string, getCode: string, getDescription: string, getUnits: string, getType: string){
        const response = await updateCurriculumCourse(getCurriculumID, getID, getCode, getDescription, getUnits, getType);
        return response
    }

    async deleteCourse(getCurriculumID: string, getCourseID: string){
        const response = await deleteCurriculumCourses(getCurriculumID, getCourseID);
        return response
    }
}

async function programlist() {
    const curriculum = new Curriculum();
        
    const readAll = await curriculum.readAll();
    if (readAll) {
        // Create a Set to store unique major values
        const uniquePrograms = new Set();

        // Iterate over each curriculum and add its major to the Set
        readAll.forEach((curriculum: any) => {
            uniquePrograms.add(curriculum.program);
        });

        // Convert the Set back to an array and log the unique major values
        return(Array.from(uniquePrograms).join(', '));
    } else {
        console.error('Failed to read all curriculum.');
    }
}

async function majorlist(program: any) {
    const curriculum = new Curriculum();
    
    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided major
        const filteredCurriculums = readAll.filter((curriculum: any) => curriculum.program === program);
        
        // Create a Set to store unique years for the filtered curriculums
        const uniqueMajors = new Set();

        // Iterate over the filtered curriculums and add their years to the Set
        filteredCurriculums.forEach((curriculum: any) => {
            uniqueMajors.add(curriculum.major);
        });

        // Convert the Set back to an array and return the unique years
        return Array.from(uniqueMajors);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

async function yearlist(major: any) {
    const curriculum = new Curriculum();
    
    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided major
        const filteredCurriculums = readAll.filter((curriculum: any) => curriculum.major === major);
        
        // Create a Set to store unique years for the filtered curriculums
        const uniqueYears = new Set();

        // Iterate over the filtered curriculums and add their years to the Set
        filteredCurriculums.forEach((curriculum: any) => {
            uniqueYears.add(curriculum.year);
        });

        // Convert the Set back to an array and return the unique years
        return Array.from(uniqueYears);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

async function semesterlist(major: any) {
    const curriculum = new Curriculum();
    
    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided major
        const filteredCurriculums = readAll.filter((curriculum: any) => curriculum.major === major);
        
        // Create a Set to store unique years for the filtered curriculums
        const uniqueSemester = new Set();

        // Iterate over the filtered curriculums and add their years to the Set
        filteredCurriculums.forEach((curriculum: any) => {
            uniqueSemester.add(curriculum.semester);
        });

        // Convert the Set back to an array and return the unique years
        return Array.from(uniqueSemester);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

async function aproach_in_list() {
    // const program = await programlist()
    // console.log(program)
    // const major = await majorlist('BSIT')
    // console.log(major)
    // const year = await yearlist('Business Analytics')
    // console.log(year)
    // const semester = await semesterlist('Business Analytics')
    // console.log(semester)
}
aproach_in_list()



// here's how we handle the functions
async function approach() {
        //user, teacher, rooms, courses has the same approach
    /*  const user = new Users();

        // //read a single user
        // const read = await user.read('65622fd76173f67b0bb8a9fa');// _id of the user you want to read
        // console.log(read._id)//id, username, password

        // //read all users
        // const readAll = await user.readAll()
        // if (readAll) {
        //     //read id
        //     console.log('User IDs:', readAll.map((user: userModel) => user._id  //_id, code, description, units, type
        //     ).join(', ')); //map function is the same function of for loop 
        // } else {
        //     console.error('Failed to read all users.');
        // }

        // //create user
        // const create = await user.create('leiner4', '123')//username, password
        // console.log(create._id),// _id, username, password

        // //update user
        // const update = await user.update( '6563acf43975c81bebf4de23', 'leiner4', '123')// _id, username, password
        // console.log(update.username) // _id, username, password

        // //delete user
        // const del = await user.delete( '6563abe53975c81bebf4de20') // user id you want to delete
    */

    /* const teacher = new Teachers();
        
        // //read a single teacher
        // const read = await teacher.read('655e35a67c3c3cca9a957b20');//id
        // console.log(read)//  _id, name, specialized

        // //read all teacher
        // const readAll = await teacher.readAll()
        // if (readAll) {
        //     //read id 
        //     console.log('User IDs:', readAll.map((teacher: teacherModel) => teacher._id).join(', ')); //map function is the same function of for loop 
            
        // } else {
        //     console.error('Failed to read all users.');
        // }


        // //create teacher
        // const create = await teacher.create(
        //     'Davis', 
        //     'sa',
        //     [
        //         {
        //             code: "IT 3206",
        //             description: "Database Management",
        //             units: "3", 
        //             type: 'Laboratory'
        //         }
        //     ]
        //     )//  name, specialized
        // console.log(create)// _id, name, specialized

        // // //update teacher
        // const update = await teacher.update( '662277eb111608cb26ead79d', 'Davis', 'sa', [
        //     {code: 'CC 1100',
        //     description: "Introduction to Computing",
        //     units: "5",
        //     type: "Laboratory"
        // }
        // ])// _id, name, specialized
        // console.log(update) // _id, name, specialized

        // //delete teacher
        // const del = await teacher.delete( '662275df5eb349b42d801d1a') //id you want to delete
    */

    /*  const room = new Rooms();
        
        // //read a single teacher
        // const read = await room.read('655e3853cdba379e4dc7acff'); //_id, name, type
        // console.log(read)//_id, name, type

        // // read all room
        // const readAll = await room.readAll()
        // if (readAll) {
        //     //read id 
        //     console.log('User IDs:', readAll.map((room: roomModel) => room._id).join(', ')); //map function is the same function of for loop 
        // } else {
        //     console.error('Failed to read all users.');
        // }

        // //create room
        // const create = await room.create('roo3', 'lab')// name, type
        // console.log(create)//name, type

        // //update room
        // const update = await room.update( '6564ec8a4701fb0526023e3d', 'room3', 'lab')//_id, name, type
        // console.log(update)//_id, name, type 

        // //delete room
        // const del = await room.delete( '6564ec8a4701fb0526023e3d') //_id */

    /*  const courses = new Courses();
        
        // //read a single course
        // const read = await course.read('6564f59459a483195f288501');//_id
        // console.log(read)//_id, code, description, units, type

        // // read all course
        // const readAll = await course.readAll()
        // if (readAll) {
        //     //read id 
        //     console.log('User IDs:', readAll.map((course: courseModel) => course._id).join(', ')); //map function is the same function of for loop 
        // } else {
        //     console.error('Failed to read all users.');
        // }

        // //create course
        // const create = await course.create('course 1', 'course number 1', '3', 'lab')
        // console.log(create)//_id, code, description, units, type

        // //update course
        // const update = await course.update('65661e3acdfcd96fb654541d', 'course 1 update', 'course number 1', '3', 'lab')
        // console.log(update._id) //_id, code, description, units, type

        // //delete course
        // const del = await course.delete( '6564f59459a483195f288501')//_id  */
        
    /*   const student = new Students()
        // //read a single student
        // const read = await student.read('65683b2f8c072cc2269bdaf9'); //id
        // console.log(read.courses)//you can get any information inside student's data (e.g, id, program, year, semester, block, courses)

        // // read all student
        // const readAll = await student.readAll() // can be use in the listing and to get the data of every program block exist on the database
        // //use this kind of approach to get what you need
        // if (readAll) {
        //     //read id 
        //     console.log('User IDs:', readAll.map((student: studentModel) => student._id).join(', ')); //map function is the same function of for loop 
        // } else {
        //     console.error('Failed to read all users.');
        // }

        // //create student
        // const create = await student.create(
        //     'BSIT', //program
        //     '4', // year
        //     '1', //semester
        //     'D', //block
        //     [
        //         {
        //             code: 'CS 2101', 
        //             description: 'Introduction to Computer Science', 
        //             units: '3', 
        //             type: 'Lecture'
        //         },
        //         {
        //             code: 'IT 3206', 
        //             description: 'Database Management', 
        //             units: '3', 
        //             type: 'Laboratory'
        //         },
        //         {
        //             code: 'IT 3205', 
        //             description: 'Web Development', 
        //             units: '3', 
        //             type: 'Lecture'
        //         }
        //     ]
        //     )
        // console.log(create.courses) ////you can get any information inside student's data you've created  (e.g, id, program, year, semester, block, courses)

        // //update student
        // const update = await student.update(
        //     '65683b2f8c072cc2269bdaf9',// id you want to update
        //     'BSCS', //program
        //     '4', // year
        //     '2', //semester
        //     'C', //block
        //     [
        //         {
        //             code: 'course 1', 
        //             description: 'course number 1', 
        //             units: '3', 
        //             type: 'lab'
        //         },
        //         {
        //             code: 'course 2', 
        //             description: 'course number 2', 
        //             units: '3', 
        //             type: 'lab'
        //         }
        //     ]
        //     )
        // console.log(update)//you can get any information inside student's data you updated  (e.g, id, program, year, semester, block, courses)

        // //delete student
        // const del = await student.delete( '65683b2f8c072cc2269bdaf9')  // id you want to delete

        // //read a single course
        // const readCourse = await student.readCourse(
        //     '656abfb4c8f7d89bbf7748d6', // id of the programblock that has the course's data you want to get the value 
        //     'course1' // CourseCode of the course you want to read
        //     );
        // console.log(readCourse)//you can get any information inside student's course data you want to get  (e.g, code, description, units, type )

        // read all course
        // const readAllCourses = await student.readAllCourses('656abfb4c8f7d89bbf7748d6')// the id of the student's courses you want to get
        // //same approach of read all student data
        // if (readAllCourses) {
        //     //read id 
        //     console.log('User IDs:', readAllCourses.map((course: courseModel) => course._id).join(', ')); //map function is the same function of for loop 
        // } else {
        //     console.error('Failed to read all users.');
        // }

        // //create course
        // const addCourse = await student.addCourse(
        //     '656abfb4c8f7d89bbf7748d6', //student id where you want to add course
        //     'course4', // course code
        //     'course number 2', // course description
        //     '3', //units
        //     'lab'//type
        //     )
        // console.log(addCourse)

        // //update course
        // const updateCourse = await student.updateCourse(
        //     '656abfb4c8f7d89bbf7748d6', // student id
        //     '656ac448fb46bfeb8f588451', // course id
        //     'course4', //course code
        //     'course number 4', //course description
        //     '3', // unit
        //     'lab'// type
        //     )
        // console.log(updateCourse?.code)//you can get any information inside student's course data you want to update  (e.g, code, description, units, type )


        // //delete course
        // const del = await student.deleteCourse( 
        //     '656abfb4c8f7d89bbf7748d6', // student id
        //     '656ac8abfb46bfeb8f5884a7' //course id
        //     )   
        */
        
    /*    const schedule = new Schedules()

        // const response = await schedule.deleteAll()
        // console.log(response)

        // const response = await schedule.readOptions()
        // if (response) {
        //         //read id
        //         console.log('User IDs:', response.map((schedule: optionsModel) => schedule._id  //_id, code, description, units, type
        //         ).join(', ')); //map function is the same function of for loop 
        //     } else {
        //         console.error('Failed to read all users.');
        //     }

        // const response = await schedule.readAllPrograms('6581227ec7827d752239115f'); // options id
        // if (response && response.allSchedules) {
        // console.log('Schedule IDs:', response.allSchedules.map((schedule: scheduleModel) => schedule._id).join(', '));
        // } else {
        // console.error('Failed to read all schedules.');
        // }

        // const response = await schedule.readsingleProgram('6581227ec7827d752239115f', '6581227ec7827d7522391175')
        // console.log(response.program)

        // const response = await schedule.readSchedule('6581227ec7827d752239115f', '6581227ec7827d7522391161')
        // if (response) {
        //         //read id
        //         console.log('User IDs:', response.map((schedule: scheduleItemModel) => schedule.courseCode  //_id, code, description, units, type
        //         ).join(', ')); //map function is the same function of for loop 
        //     } else {
        //         console.error('Failed to read all users.');
        //     }

        // const response = await schedule.readSingleSchedule('6581227ec7827d752239115f', '6581227ec7827d7522391161', '6581227ec7827d7522391164')
        // console.log(response.courseCode)
    */

    
    /* const curriculum = new Curriculum();
        
    // //read a single curriculum
    // const read = await curriculum.read('6619012220726f92158fed10');//id
    // console.log(read)//  _id, name, specialized

    // // Read all curriculum
    // const readAll = await curriculum.readAll();
    // if (readAll) {
    //     // Create a Set to store unique major values
    //     const uniqueMajors = new Set();

    //     // Iterate over each curriculum and add its major to the Set
    //     readAll.forEach((curriculum: any) => {
    //         uniqueMajors.add(curriculum.major);
    //     });

    //     // Convert the Set back to an array and log the unique major values
    //     console.log( Array.from(uniqueMajors).join(', '));
    // } else {
    //     console.error('Failed to read all curriculum.');
    // }

    // //create curriculum
    // const create = await curriculum.create(
    //     'BSCS', 
    //     '1',
    //     '2',
    //     [
    //         {
    //             code: "IT 3206",
    //             description: "Database Management",
    //             units: "3", 
    //             type: 'Laboratory'
    //         },
    //         {
    //             code: "GE6",
    //             description: "GE",
    //             units: "3", 
    //             type: 'Lecture'
    //         }
    //     ]
    //     )//  name, specialized
    // console.log(create)// _id, name, specialized

    // //update curriculum
    // const update = await curriculum.update( '6619012220726f92158fed10', 'getProgram', 'getYear', 'getSemester', 'getCurriculum')// _id, name, specialized
    // console.log(update) // _id, name, specialized

    // //delete curriculum
    // const del = await curriculum.delete( '6619012220726f92158fed10') //id you want to delete

    */
}

approach()
