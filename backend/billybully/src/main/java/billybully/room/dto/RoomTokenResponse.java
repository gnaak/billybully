package billybully.room.dto;

public record RoomTokenResponse(
        String sessionToken,
        Long id
) {
    public static RoomTokenResponse of(String sessionToken, Long id){
        return new RoomTokenResponse(sessionToken, id);
    };
}
