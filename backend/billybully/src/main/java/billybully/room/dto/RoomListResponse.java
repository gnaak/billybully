package billybully.room.dto;

import billybully.room.domain.Room;

import java.util.List;

public record RoomListResponse(
        List<RoomDto> roomList
) {
    public static RoomListResponse of(List<RoomDto> roomList){
        return new RoomListResponse(roomList);
    }
}
