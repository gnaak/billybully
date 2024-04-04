package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class SessionNotExistException extends BillyBullyException {

    public SessionNotExistException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "존재하지 않는 세션입니다."));
    }
}
