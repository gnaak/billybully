package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RoomFullException extends BillyBullyException {
    public RoomFullException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "방 정원을 초과했습니다."));
    }
}
