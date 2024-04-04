package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RoomParticipatedException extends BillyBullyException {
    public RoomParticipatedException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "이미 게임에 참여중입니다."));
    }
}
