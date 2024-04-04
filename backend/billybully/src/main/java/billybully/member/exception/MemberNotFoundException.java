package billybully.member.exception;

import billybully.common.error.BillyBullyException;
import billybully.common.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends BillyBullyException {
    public MemberNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."));
    }

}
