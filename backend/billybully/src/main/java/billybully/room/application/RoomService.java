package billybully.room.application;

import billybully.game.domain.Situation;
import billybully.member.domain.repository.MemberRepository;
import billybully.room.Exception.RoomNotFoundException;
import billybully.room.dto.RoomDto;
import billybully.room.dto.RoomListResponse;
import billybully.room.dto.RoomTokenResponse;
import billybully.room.infra.OpenViduClient;
import billybully.room.domain.Player;
import billybully.room.domain.Room;
import billybully.room.domain.respository.PlayerRepository;
import billybully.room.domain.respository.RoomRepository;
import billybully.room.support.RoomValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final OpenViduClient openViduClient;
    private final RoomRepository roomRepository;
    private final PlayerRepository playerRepository;
    private final MemberRepository memberRepository;
    public RoomTokenResponse create(String name, Integer password, Long memberId) {
        Room room = roomRepository.save(new Room(name, password, memberId));
        playerRepository.save(new Player(room.getId(), memberId));
        String sessionToken = openViduClient.createRequest(name);
        return RoomTokenResponse.of(sessionToken, room.getId());
    }

    @Transactional
    public void leave(Long memberId,Long roomId){
        playerRepository.deleteByMemberId(memberId);
        if(checkEmpty(roomId) <= 0){
            roomRepository.deleteById(roomId);
        };
    }

    public RoomTokenResponse enter(Long roomId, Long memberId){
        Room room = roomRepository.getById(roomId);
        playerRepository.save(new Player(roomId, memberId));
        String sessionToken = openViduClient.enterRequest(room.getName());
        return RoomTokenResponse.of(sessionToken, room.getId());
    }

    public List<RoomDto> list(){
        List<Room> roomList = roomRepository.findAll();
        return roomList.stream()
                .map(room -> {
                    int participantsCount = playerRepository.findByRoomId(room.getId()).size();
                    String masterName = memberRepository.getById(room.getMasterId()).getName();
                    room.updatePlayers(participantsCount);
                    return RoomDto.of(
                            room.getId(),
                            room.getName(),
                            room.getPassword(),
                            room.getMasterId(),
                            masterName,
                            room.getGameStarted(),
                            room.getPlayers());
                })
                .collect(Collectors.toList());
    }

    public int checkEmpty(Long roomId){
        Room room = roomRepository.getById(roomId);
        return playerRepository.findByRoomId(room.getId()).size();
    }
}
