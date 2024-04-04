package billybully.room.dto;

import lombok.Getter;

@Getter
public class RoomCredentials{
    Long id;
    Integer password;
    Long memberId;

    public RoomCredentials(Long id, Integer password, Long memberId){
        this.id=id;
        this.password=password;
        this.memberId=memberId;
    }

    public RoomCredentials(Long memberId){
        this.memberId=memberId;
    }
}
