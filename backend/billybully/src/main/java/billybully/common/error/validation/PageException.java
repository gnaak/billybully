package billybully.common.error.validation;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class PageException extends BillyBullyException {

    public PageException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "요청한 페이지로 실행할 수 없습니다."));
    }
}
