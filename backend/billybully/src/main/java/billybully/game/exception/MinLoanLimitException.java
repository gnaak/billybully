package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class MinLoanLimitException extends BillyBullyException {
    public MinLoanLimitException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "대출금이 해당 금액보다 적습니다."));
    }
}
