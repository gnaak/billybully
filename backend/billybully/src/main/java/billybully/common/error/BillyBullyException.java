package billybully.common.error;

import lombok.Getter;

@Getter
public class BillyBullyException extends RuntimeException {
    private final ErrorCode errorCode;

    public BillyBullyException(ErrorCode errorCode) {
        super(errorCode.message());
        this.errorCode = errorCode;
    }
    
}
