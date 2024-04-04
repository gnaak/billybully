package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class PlayerNotFoundException extends BillyBullyException {
    public PlayerNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 플레이어가 없습니다."));
    }
}
