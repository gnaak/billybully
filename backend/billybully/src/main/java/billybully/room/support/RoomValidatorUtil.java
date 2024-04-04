package billybully.room.support;

import billybully.room.Exception.PasswordNotMatchingException;
import billybully.room.Exception.RoomFullException;
import billybully.room.Exception.RoomParticipatedException;
import billybully.room.Exception.RoomStartedException;
import billybully.room.dto.RoomCredentials;
import billybully.room.dto.RoomEnterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

@Component
@RequiredArgsConstructor
public class RoomValidatorUtil {
    private final RoomValidator validator;

    public void validate(RoomCredentials roomCredentials){

        Errors errors = new BeanPropertyBindingResult(roomCredentials, "roomCredentials");
        validator.validate(roomCredentials,errors);

        if (errors.hasErrors()) {
            for (ObjectError error : errors.getAllErrors()) {
                String[] errorCodes = error.getCodes();
                for (String errorCode : errorCodes) {
                    switch (errorCode) {
                        case "ROOM_PARTICIPATED":
                            throw new RoomParticipatedException();
                        case "GAME_STARTED":
                            throw new RoomStartedException();
                        case "ROOM_FULL":
                            throw new RoomFullException();
                        case "PASSWORD_MISMATCH":
                            throw new PasswordNotMatchingException();
                    }
                }
            }
        }
    }
}