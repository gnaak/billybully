package billybully.auth.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class RefreshTokenNotFoundException extends BillyBullyException {

    public RefreshTokenNotFoundException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "존재하지 않는 리프레시 토큰입니다."));
    }

}
