package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RoomNotFoundException extends BillyBullyException {
    public RoomNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "존재하지 않는 방입니다."));
    }
}
