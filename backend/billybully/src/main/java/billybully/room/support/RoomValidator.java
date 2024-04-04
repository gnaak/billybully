package billybully.room.support;

import billybully.room.Exception.RoomNotFoundException;
import billybully.room.domain.Player;
import billybully.room.domain.Room;
import billybully.room.domain.respository.PlayerRepository;
import billybully.room.domain.respository.RoomRepository;
import billybully.room.dto.RoomCredentials;
import billybully.room.dto.RoomEnterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class RoomValidator implements Validator {
    private final RoomRepository roomRepository;
    private final PlayerRepository playerRepository;
    private static final int MAX_PARTICIPANTS = 4;

    @Override
    public boolean supports(Class<?> clazz) {
        return RoomEnterRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RoomCredentials roomCredentials = (RoomCredentials) target;
        Player player = playerRepository.findByMemberId(roomCredentials.getMemberId()).orElse(null);
        Room room = null;

        if(roomCredentials.getId() != null){
            room = roomRepository.findById(roomCredentials.getId()).orElse(null);
        }
        if(player != null){
            errors.rejectValue(null,"ROOM_PARTICIPATED", "이미 게임에 참여중입니다");
        }

        if(room != null) {
            if(room.getGameStarted()){
                errors.rejectValue(null,"GAME_STARTED", "이미 진행중인 게입입니다.");
            } else if (room.getPlayers() >= MAX_PARTICIPANTS) {
                errors.rejectValue(null, "ROOM_FULL", "방 정원을 초과했습니다");
            } else if(room.getPassword()!=null &&!room.getPassword().equals(roomCredentials.getPassword())) {
                errors.rejectValue(null, "PASSWORD_MISMATCH", "비밀번호가 일치하지 않습니다.");
            }
        }
    }
}
