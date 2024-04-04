package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class FintechNotFoundException extends BillyBullyException {
    public FintechNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 재산이 없습니다."));
    }
}
