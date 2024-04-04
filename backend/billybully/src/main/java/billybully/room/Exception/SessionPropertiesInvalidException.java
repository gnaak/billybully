package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class SessionPropertiesInvalidException extends BillyBullyException {

    public SessionPropertiesInvalidException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "유요하지 않는 세션 설정입니다."));
    }
}
