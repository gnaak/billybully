package billybully.auth.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenExpiredException extends BillyBullyException {

    public TokenExpiredException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "토큰이 만료됐습니다."));
    }

}
