package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class ConnectionPropertiesInvalidException extends BillyBullyException {

    public ConnectionPropertiesInvalidException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "유요하지 않는 세션 연결 설정입니다."));
    }
}
