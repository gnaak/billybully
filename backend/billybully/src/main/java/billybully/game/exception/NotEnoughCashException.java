package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class NotEnoughCashException extends BillyBullyException {
    public NotEnoughCashException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "현금이 부족합니다."));
    }
}
