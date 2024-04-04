package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class SituationNotFoundException extends BillyBullyException {
    public SituationNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "존재하지 않는 상황입니다."));
    }
}
