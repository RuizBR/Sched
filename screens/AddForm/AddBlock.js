import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Students, Curriculum } from '../../src/index'; // Import Curriculum class
import COLORS from '../../constants/colors';

class AddBlock extends Component {
    state = {
        program: '',
        major: '',
        year: '',
        semester: '',
        block: '',
        programOptions: [],
        majorOptions: [],
        yearOptions: [],
        semesterOptions: [],
    };

    async componentDidMount() {
        // Fetch program list from curriculum
        const programs = await programlist();
        this.setState({ programOptions: programs });
    }

    clearInputs = () => {
        this.setState({
            program: '',
            major: '',
            year: '',
            semester: '',
            block: '',
        });
    };

    handleProgram = async (text) => {
        this.setState({ program: text });

        // Fetch major list based on selected program
        const majors = await majorlist(text);
        this.setState({ majorOptions: majors, major: '' });
    };

    handleMajor = async (text) => {
        this.setState({ major: text });

        // Fetch year list based on selected major
        const years = await yearlist(text);
        this.setState({ yearOptions: years, year: '' });
    };

    handleYear = async (text) => {
        this.setState({ year: text });
    
        // Fetch semester list based on selected year
        const semesters = await semesterlist(this.state.major, text);
        this.setState({ semesterOptions: semesters, semester: '' });
    };
    
    handleSemester = (text) => {
        this.setState({ semester: text });
    };
    

    handleBlock = (text) => {
        this.setState({ block: text });
    };

    save = async () => {
        const { program, major, year, semester, block } = this.state;

        if (!program || !major || !year || !semester || !block) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

        console.log('Saving Block Details...');
        console.log('Program:', program);
        console.log('Major:', major);
        console.log('Year:', year);
        console.log('Semester:', semester);
        console.log('Block:', block);
        try {
            const student = new Students();

            // Save block details with the associated courses
            await student.create(program, major, year, semester, block);

            // Display success message or perform further actions
            setTimeout(() => {
                Alert.alert('Created Successfully', 'Details saved successfully.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to Dashboard screen
                            this.props.navigation.navigate('Blocks');
                        },
                    },
                ]);
            }, 500);
            this.clearInputs();
            // Further operations with courseDetails...
        } catch (error) {
            Alert.alert('Error', 'Failed to create block. Please try again.');
            console.error('Error creating block:', error);
        }
    };

    render() {
        const { navigation } = this.props;

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.teal,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        marginTop: 20,
                        padding: 10,
                        alignSelf: 'flex-start',
                    }}
                >
                    Add Block
                </Text>

                {/* Program Picker */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Program:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            backgroundColor: '#bce3e1',
                            borderRadius: 15,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 48,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Picker
                                selectedValue={this.state.program}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue) => this.handleProgram(itemValue)}
                            >
                                <Picker.Item label="Select Program" value="" color={COLORS.grey} enabled={true} />
                                {this.state.programOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Major Picker */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Major:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            backgroundColor: '#bce3e1',
                            borderRadius: 15,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 48,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Picker
                                selectedValue={this.state.major}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue) => this.handleMajor(itemValue)}
                            >
                                <Picker.Item label="Select Major" value="" color={COLORS.grey} enabled={true} />
                                {this.state.majorOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Year Picker */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Year:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            backgroundColor: '#bce3e1',
                            borderRadius: 15,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 48,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Picker
                                selectedValue={this.state.year}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue) => this.handleYear(itemValue)}
                            >
                                <Picker.Item label="Select Year" value="" color={COLORS.grey} enabled={true} />
                                {this.state.yearOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Semester Picker */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Semester:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            backgroundColor: '#bce3e1',
                            borderRadius: 15,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 48,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Picker
                                selectedValue={this.state.semester}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue) => this.handleSemester(itemValue)}
                            >
                                <Picker.Item label="Select Semester" value="" color={COLORS.grey} enabled={true} />
                                {this.state.semesterOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Block Picker */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Block:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            backgroundColor: '#bce3e1',
                            borderRadius: 15,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: 48,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Picker
                                selectedValue={this.state.block}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue) => this.handleBlock(itemValue)}
                            >
                                <Picker.Item label="Select Block" value="" color={COLORS.grey} enabled={true} />
                                <Picker.Item label="A" value="A" />
                                <Picker.Item label="B" value="B" />
                                <Picker.Item label="C" value="C" />
                                <Picker.Item label="D" value="D" />
                                <Picker.Item label="E" value="E" />
                                {/* Add more Picker.Item as needed */}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Button for Save and Cancel */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    {/* Save button */}
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 70,
                            backgroundColor: '#728f9e',
                            borderRadius: 20,
                            marginRight: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}
                        onPress={this.save}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                            Save
                        </Text>
                    </TouchableOpacity>

                    {/* Cancel button */}
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 70,
                            backgroundColor: COLORS.primary,
                            borderRadius: 20,
                            marginRight: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}
                        onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AddBlock;

async function programlist() {
    const curriculum = new Curriculum();

    const readAll = await curriculum.readAll();
    if (readAll) {
        // Create a Set to store unique program values
        const uniquePrograms = new Set();

        // Iterate over each curriculum and add its program to the Set
        readAll.forEach((curriculum) => {
            uniquePrograms.add(curriculum.program);
        });

        // Convert the Set back to an array and return the unique program values
        return Array.from(uniquePrograms);
    } else {
        console.error('Failed to read all curriculum.');
    }
}

async function majorlist(program) {
    const curriculum = new Curriculum();

    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided program
        const filteredCurriculums = readAll.filter((curriculum) => curriculum.program === program);

        // Create a Set to store unique majors for the filtered curriculums
        const uniqueMajors = new Set();

        // Iterate over the filtered curriculums and add their majors to the Set
        filteredCurriculums.forEach((curriculum) => {
            uniqueMajors.add(curriculum.major);
        });

        // Convert the Set back to an array and return the unique majors
        return Array.from(uniqueMajors);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

async function yearlist(major) {
    const curriculum = new Curriculum();

    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided major
        const filteredCurriculums = readAll.filter((curriculum) => curriculum.major === major);

        // Create a Set to store unique years for the filtered curriculums
        const uniqueYears = new Set();

        // Iterate over the filtered curriculums and add their years to the Set
        filteredCurriculums.forEach((curriculum) => {
            uniqueYears.add(curriculum.year);
        });

        // Convert the Set back to an array and return the unique years
        return Array.from(uniqueYears);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

async function semesterlist(major, year) {
    const curriculum = new Curriculum();

    const readAll = await curriculum.readAll();
    if (readAll) {
        // Filter curriculums based on the provided major and year
        const filteredCurriculums = readAll.filter((curriculum) => curriculum.major === major && curriculum.year === year);

        // Create a Set to store unique semesters for the filtered curriculums
        const uniqueSemesters = new Set();

        // Iterate over the filtered curriculums and add their semesters to the Set
        filteredCurriculums.forEach((curriculum) => {
            uniqueSemesters.add(curriculum.semester);
        });

        // Convert the Set back to an array and return the unique semesters
        return Array.from(uniqueSemesters);
    } else {
        console.error('Failed to read all curriculum.');
        return [];
    }
}

