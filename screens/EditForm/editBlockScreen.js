import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { readStudent, updateStudent } from '../../src/components/Students';
import COLORS from '../../constants/colors';
import { RFValue } from "react-native-responsive-fontsize";


const EditBlockScreen = ({ route, navigation }) => {
    const { blockId } = route.params;

    const [blockDetails, setBlockDetails] = useState({
        program: '',
        major: '',
        year: '',
        semester: '',
        block: ''
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const blockData = await readStudent(blockId);

                if (blockData) {
                    console.log('Fetched Block Data:', blockData); 
                    setBlockDetails({
                        program: blockData.program,
                        major: blockData.major,
                        year: blockData.year,
                        semester: blockData.semester,
                        block: blockData.block,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStudentData();
    }, [blockId]);
    
    const handleProgramChange = (value) => {
        setBlockDetails({
            ...blockDetails,
            program: value,
            major: '', // Reset major when program changes
        });
    }

    const handleUpdate = async () => {
        const { program, major, year, semester, block } = blockDetails; // Access blockDetails from state

        if (!blockId || !program || !major || !year || !semester || !block ) {
            Alert.alert('Input failed', 'Please fill in all fields and select courses.', [{ text: 'OK' }]);
            return;
        }

    console.log('Updating Block Details...');
    console.log('Block ID:', blockId);
    console.log('Program:', program);
    console.log('Major:', major);
    console.log('Year:', year);
    console.log('Semester:', semester);
    console.log('Block:', block);

    try {
        // Update block details with the associated courses using the updateStudent function
        await updateStudent(blockId, program, major, year, semester, block);

        // Display success message or perform further actions
        Alert.alert('Success', 'Block details updated successfully.');

        // Further operations with courseDetails...
    } catch (error) {
        Alert.alert('Error', 'Failed to update block. Please try again.');
        console.error('Error updating block:', error);
    }
};

    
    return (
    <View style={{
        flex: 1,
        backgroundColor: COLORS.teal,
        justifyContent: "flex-start",
        alignItems: 'center'    
    }}>

    <Text style={{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        padding: 10,
        alignSelf: 'flex-start'
    }}>Edit Block Details
    </Text>

{/* Program picker */}
<View style={{ marginBottom: 12 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Program:</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    backgroundColor: "#bce3e1",
                    borderRadius: 15,
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: "100%",
                        height: 48,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Picker
                            selectedValue={blockDetails.program}
                            style={{ height: 50, width: "100%" }}
                            onValueChange={(itemValue) => handleProgramChange(itemValue)}
                        >
                            <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                            <Picker.Item label="BSCS" value="BSCS" />
                            <Picker.Item label="BSIT" value="BSIT" />
                            {/* Add more Picker.Item as needed */}
                        </Picker>
                    </View>
                </View>
    </View>

{/* Major Picker */}
    {blockDetails.program && (
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Major:</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '90%',
                        backgroundColor: "#bce3e1",
                        borderRadius: 15,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            width: "100%",
                            height: 48,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Picker
                                selectedValue={blockDetails.major}
                                style={{ height: 50, width: "100%" }}
                                onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, major: itemValue })}
                            >
                                <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={true} />
                                {(blockDetails.program === 'BSCS' ? ['Data Science'] : ['System Development', 'Business Analytics']).map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
    )}

{/* Year Picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Year:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Picker
                    selectedValue={blockDetails.year}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, year: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
                    <Picker.Item label="3rd" value="3rd" />
                    <Picker.Item label="4th" value="4th" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

{/* Semester Picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Semester:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Picker
                    selectedValue={blockDetails.semester}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, semester: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
                    <Picker.Item label="1st" value="1st" />
                    <Picker.Item label="2nd" value="2nd" />
                    {/* Add more Picker.Item as needed */}
                </Picker>
            </View>
        </View>
    </View>

{/* Block picker */}
    <View style={{ marginBottom: 12 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8
        }}>Block:</Text>
        <View style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: "#bce3e1",
            borderRadius: 15,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                width: "100%",
                height: 48,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Picker
                    selectedValue={blockDetails.block}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) => setBlockDetails({ ...blockDetails, block: itemValue })}
                >
                    <Picker.Item label="Select Type" value="" color={COLORS.grey} enabled={false} />
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

{/* update button */}
    <View style={{
        width: 150,
        height: 50,
        backgroundColor: '#728f9e',
        borderRadius: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={handleUpdate}>
            <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Update Block
            </Text>
        </TouchableOpacity>
    </View>

    </View>
      );
};


export default EditBlockScreen;