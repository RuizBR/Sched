import { readRoomData, createRoomData, updateRoomData, deleteRoomData, readAllRoomsData } from '../api/Rooms';
import { roomModel, roomsModel } from '../models/Rooms';


export const readAllRooms = async (): Promise<{ allRooms: Array<roomsModel> } | any> => {
  try {
    const response = await readAllRoomsData();

    if (Array.isArray(response.rooms)) {
      const allRooms = response.rooms.map((room: roomModel) => ({
        _id: room._id,
        name: room.name,
        type: room.type
      }));

    return { allRooms };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all rooms: ${error.message}`);
  }
}

export const readRoom = async (getID: string): Promise<roomsModel | any> => {
  try {
    const room: roomModel = { _id: getID };
    const response: roomsModel = await readRoomData(room);

    const _id = response.room._id;
    const name = response.room.name;
    const type = response.room.type;

    return { _id, name, type };
    


  } catch (error: any) {
    console.error(`Failed to read room: ${error.message}`);
  }
};

export const createRoom = async (getName: string, getType: string) => {
  const newRoom: roomModel = {
    name: getName,
    type: getType,
  };
  try {
    const response = await createRoomData(newRoom);
    console.log(`Room created successfully:`, response);
    return response.room;
  } catch (error: any) {
    console.error(`Failed to delete room: ${error.message}`);
  }
};

export const updateRoom = async (getID: string, getName: string, getType: string) => {
  const newRoom: roomModel = {
    _id: getID,
    name: getName,
    type: getType
  };
  try {
    const response = await updateRoomData(newRoom);
    console.log(`Room update successfully:`, response);
    return response.rooms;

  } catch (error: any) {
    console.error(`Failed to update room: ${error.message}`);
  }
};

export const deleteRoom = async (getID: string) => {
  const newRoom: roomModel = {
    _id: getID
  };
  try {
    const response = await deleteRoomData(newRoom);
    console.log('Room Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete room: ${error.message}`);
  }
};
