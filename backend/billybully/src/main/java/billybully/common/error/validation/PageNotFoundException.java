package billybully.common.error.validation;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class PageNotFoundException extends BillyBullyException {
    public PageNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "페이지를 찾을 수 없습니다."));
    }
}
