package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RoomStartedException extends BillyBullyException {
    public RoomStartedException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "게임이 시작된 방입니다."));
    }
}
