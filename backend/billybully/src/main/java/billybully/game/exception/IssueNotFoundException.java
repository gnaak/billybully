package billybully.game.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class IssueNotFoundException extends BillyBullyException {
    public IssueNotFoundException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 이슈가 없습니다."));
    }
}
