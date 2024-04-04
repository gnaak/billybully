package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RoomNotFoundException extends BillyBullyException {
    public RoomNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."));
    }
}
