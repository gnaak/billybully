package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class SituationEffectNotFoundException extends BillyBullyException {
    public SituationEffectNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 상황 적용 내용이 없습니다."));
    }
}
