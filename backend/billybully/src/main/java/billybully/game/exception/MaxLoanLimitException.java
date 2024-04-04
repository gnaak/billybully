package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class MaxLoanLimitException extends BillyBullyException {
    public MaxLoanLimitException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "대출한도를 초과하였습니다."));
    }
}
