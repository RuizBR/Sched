import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { readAllCourses } from '../src/components/Courses';
import { deleteCourse } from '../src/components/Courses';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

function SubjectList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCourses(); // Refresh courses when screen comes into focus
    });
    return unsubscribe;
  }, [navigation]);

  const fetchCourses = async () => {
    try {
      const { allCourses } = await readAllCourses();
      setCourses(allCourses);
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
      'Are you sure you want to delete the selected course(s)?',
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
              await Promise.all(selectedItems.map((itemId) => deleteCourse(itemId)));
              fetchCourses(); // Refresh the course list after deletion
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
      'Are you sure you want to delete this course?',
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
              await deleteCourse(itemId);
              // If you want to update the list after deletion, fetch courses again
              fetchCourses();
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderSelectDeleteButtons = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isSelectionMode ? (
          <>
            <TouchableOpacity onPress={handleToggleSelection}>
              <Ionicons name="ios-checkbox-outline" size={24} color="black" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </>
        ) : (
          <>
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
        navigation.navigate('EditCourse', { courseId: itemId });
      }
    };
  
    const isSelected = selectedItems.includes(item._id);
  
    // Check if either the course code or description contains the search query
    if (
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return (
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
                    <Ionicons name="ios-book" size={25} color="black" />
                  </View>
  
                  <View>
                    <Text style={{ fontSize: 20 }}>{item.code}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.description}</Text>
                  </View>
                </View>
  
                {isSelectionMode && (
                  <Ionicons
                    name={isSelected ? 'ios-checkbox' : 'ios-checkbox-outline'}
                    size={25}
                    color={isSelected ? COLORS.primary : 'grey'}
                    style={{ marginLeft: 20 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </Swipeable>
        </GestureHandlerRootView>
      );
    } else {
      return null;
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.teal }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{
          fontSize: 24,
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 10,
        }}>Courses
        </Text>

        {/* Render the selection buttons */}
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
        <>
          <TextInput
            style={{ backgroundColor: 'white', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10 }}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            style={{ marginBottom: 30 }}
            data={courses}
            renderItem={renderItem}
            keyExtractor={(course) => course._id}
          />
        </>
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
          navigation.navigate('SubjectAdd');
          console.log('Floating button pressed');
        }}>
        {/* You can customize the icon or content of the floating button */}
        <Ionicons name="ios-add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default SubjectList;
