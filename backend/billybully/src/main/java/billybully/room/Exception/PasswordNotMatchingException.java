package billybully.room.Exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class PasswordNotMatchingException extends BillyBullyException {
    public PasswordNotMatchingException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "비밀번호가 일치하지 않습니다."));
    }
}
