import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { readAllTeachers } from '../src/components/Teachers';
import { deleteTeacher } from '../src/components/Teachers';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';


function SubjectList() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    fetchTeachers();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTeachers(); // Refresh rooms when screen comes into focus
    });
    return unsubscribe;
  }, [navigation]);

  const fetchTeachers = async () => {
    try {
      const { allTeachers } = await readAllTeachers();
      // Convert object to an array
      const teachersArray = Object.values(allTeachers); // Assuming allTeachers is an object

      setTeachers(teachersArray);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleToggleSelection = () => {
    setIsSelectionMode((prevMode) => !prevMode);
    setSelectedItems([]); // Clear selected items when toggling selection mode
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId)); // Deselect if already selected
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]); // Select if not already selected
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      // If no items are selected, return or display an alert indicating no items are selected
      return;
    }

    Alert.alert(
      'Delete Items',
      'Are you sure you want to delete the selected faculty?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await Promise.all(selectedItems.map((itemId) => deleteTeacher(itemId)));
              fetchTeachers(); // Refresh the teacher list after deletion
              setSelectedItems([]); // Clear selected items after deletion
              setIsSelectionMode(false); // Exit selection mode after deletion
            } catch (error) {
              console.error('Error deleting items:', error);
              // Handle error state or display an error message
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = (itemId) => {
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete this data?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteTeacher(itemId);
            // If you want to update the list after deletion, fetch faculty again
            fetchTeachers();
          } catch (error) {
            console.error('Error deleting item:', error);
            // Handle error state or display an error message
          }
        },
        style: 'destructive',
      },
    ],
    { cancelable: true }
  );
  };

  const handleEdit = (itemId) => {
  // // Navigate to the EditTeacherScreen with the teacherId as a parameter
  // navigation.navigate('EditFaculty', { teacherId: itemId });
  };

  const handleSelectAll = () => {
    const allItemIds = teachers.map((teachers) => teachers._id); // Corrected from room to rooms
    setSelectedItems(allItemIds); // Mark all items as selected
  };
  
  const renderSelectDeleteButtons = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isSelectionMode ? (
          <TouchableOpacity onPress={handleToggleSelection}>
            <Ionicons name="ios-checkbox-outline" size={24} color="black" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={handleSelectAll}>
              <Ionicons name="ios-checkbox" size={24} color="black" style={{ marginRight: 12 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteSelected}>
              <Ionicons name="trash" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleSelection}>
              <Ionicons name="ios-close-circle" size={24} color="black" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const renderRightActions = (itemId) => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        maxWidth: 90,
        marginTop: 20,
      }}>
        <TouchableOpacity activeOpacity={1} onPress={() => handleDelete(itemId)}>
          <View style={{
            color: 'white',
            width: 110,
            height: 80,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: '#80CBC4',
            marginRight: 25,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Ionicons name="ios-trash" size={30} color="white" style={{ marginLeft: 20 }}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const handleItemClick = (itemId) => {
      if (isSelectionMode) {
        handleSelectItem(itemId); // Select item if in selection mode
      } else {
        // navigation.navigate('EditFaculty', { teacherId: itemId });
      }
    };

    const isSelected = selectedItems.includes(item._id);

  return (

// properties of the flat list
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => renderRightActions(item._id)}
        overshootRight={false}
      >
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleItemClick(item._id)}
            style={{
              padding: 20,
              width: '90%',
              height: 80,
              borderRadius: 15,
              backgroundColor: isSelected ? '#ccc' : '#dedddf',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}>
                  <Ionicons name="ios-people" size={25} color="black" />
                </View>

                  <View>
                      <Text style={{ fontSize: 20 }}>{item.name}</Text>
                      {/* <Text style={{ fontSize: 14, color: 'gray' }}>
                        {item.specialized &&
                          `Specialized: ${item.specialized
                            .map((course) => course.description)
                            .join(', ')}`}
                      </Text> */}
                  </View>
            </View>

            {isSelectionMode && (
              <Ionicons
                name={isSelected ? 'ios-checkbox' : 'ios-checkbox-outline'}
                size={25}
                color={isSelected ? COLORS.primary : 'grey'}
                style={{ marginRight: 20 }}
              />
            )}
        </TouchableOpacity>

      </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.teal }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{
              fontSize: 24,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>Faculty List
          </Text>
          <View style={{ marginRight: 20 }}>{renderSelectDeleteButtons()}</View>
        </View>

          {error ? (
            <Text style={{
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
              marginTop: 20,
            }}>{error}</Text>
          ) : (
            <FlatList
              data={teachers}
              renderItem={renderItem}
              keyExtractor={(teacher) => teacher._id} // Convert _id to string
            />
          )}

        {/* Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.primary, // Change this to your desired color
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 30,
              right: 40,
              elevation: 3, // Add elevation for shadow (Android)
              shadowColor: '#000', // Add shadow for iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }}
            onPress={() => {
              navigation.navigate('FacultyAdd');
              console.log('Floating button pressed');
            }}>
            {/* You can customize the icon or content of the floating button */}
            <Ionicons name="ios-add" size={30} color="white" />
          </TouchableOpacity>
    </View>
  );
}


export default SubjectList;
