package billybully.auth.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenMissingException extends BillyBullyException {

    public TokenMissingException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "토큰이 필요합니다."));
    }

}
