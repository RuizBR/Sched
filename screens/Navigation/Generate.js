import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Picker } from 'react-native';
import { readAllProgram, readAllSchedule } from '../api/filename'; // Replace 'filename' with the actual file name

const ScheduleByYearAndProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch programs based on selected year
    if (selectedYear !== '' && selectedProgram === '') {
      fetchProgramsByYear(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    // Fetch schedule based on selected program
    if (selectedProgram !== '') {
      fetchScheduleByProgram(selectedProgram);
    }
  }, [selectedProgram]);

  const fetchProgramsByYear = async (year) => {
    try {
      const response = await readAllProgram(year); // Replace with the actual API call
      setPrograms(response?.allSchedules || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchScheduleByProgram = async (programId) => {
    try {
      const response = await readAllSchedule(programId); // Replace with the actual API call
      setSchedule(response?.allSchedules || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  return (
    <View>
      <View>
        {/* Year Picker */}
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          <Picker.Item label="Select Year" value="" />
          <Picker.Item label="1st" value="1st" />
          <Picker.Item label="2nd" value="2nd" />
          <Picker.Item label="3rd" value="3rd" />
          <Picker.Item label="4th" value="4th" />
        </Picker>
      </View>

      <View>
        {/* Program Picker */}
        <Picker
          selectedValue={selectedProgram}
          onValueChange={(itemValue) => setSelectedProgram(itemValue)}
        >
            <Picker.Item label="Select Program" value="" />
            <Picker.Item label="BSCS" value="BSCS" />
            <Picker.Item label="BSIT" value="BSIT" />
        </Picker>
      </View>

      <View>
        {/* Display fetched schedule */}
        <FlatList
          data={schedule}
          renderItem={({ item }) => (
            <View>
              <Text>{item.courseCode}</Text>
              {/* Render other schedule details */}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ScheduleByYearAndProgram;
