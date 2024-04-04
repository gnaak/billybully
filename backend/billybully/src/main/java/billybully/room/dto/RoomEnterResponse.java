package billybully.room.dto;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;


public record RoomEnterResponse(
        String sessionToken
) {
    public RoomEnterResponse of(String sessionToken, boolean isValidPassword){
        return new RoomEnterResponse(sessionToken);
    };

}
