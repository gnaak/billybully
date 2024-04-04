package billybully.room.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public record RoomDto(
        Long id,

        String name,

        Integer password,

        Long masterId,
        String masterName,

        Boolean gameStarted,

        int players
) {
    public static RoomDto of(Long id, String name, Integer password, Long masterId, String masterName, Boolean gameStarted, int players){
        return new RoomDto(id, name, password, masterId, masterName, gameStarted, players);
    }
}
