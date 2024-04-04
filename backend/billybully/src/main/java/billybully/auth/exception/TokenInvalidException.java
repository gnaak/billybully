package billybully.auth.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenInvalidException extends BillyBullyException {

    public TokenInvalidException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."));
    }

}
