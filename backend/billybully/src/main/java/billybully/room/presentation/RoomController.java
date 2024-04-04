package billybully.room.presentation;

import billybully.auth.dto.AuthCredentials;
import billybully.auth.presentation.Auth;
import billybully.room.application.RoomService;
import billybully.room.domain.Room;
import billybully.room.dto.*;
import billybully.room.support.RoomValidatorUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "Game Room", description = "게임방 API")
public class RoomController {

    private final RoomService roomService;
    private final RoomValidatorUtil roomValidatorUtil;

    @Operation(summary = "방 생성", description = "방 생성")
    @PostMapping("/create")
    public ResponseEntity<RoomTokenResponse> create(
            @RequestBody RoomCreateRequest roomCreateRequest,
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials
    ){
        roomValidatorUtil.validate(new RoomCredentials(authCredentials.id()));
        return ResponseEntity.ok(roomService.create(roomCreateRequest.name(), roomCreateRequest.password(),authCredentials.id()));
    }

    @Operation(summary = "방 입장", description = "방 입장")
    @PostMapping("/enter")
    public ResponseEntity<RoomTokenResponse> enter(
            @RequestBody RoomEnterRequest roomEnterRequest,
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials
    ){
        System.out.println("roomEnterRequest : "+roomEnterRequest.id()+" , "+roomEnterRequest.password());
        roomValidatorUtil.validate(new RoomCredentials(roomEnterRequest.id(),roomEnterRequest.password(), authCredentials.id()));
        return ResponseEntity.ok(roomService.enter(roomEnterRequest.id(),authCredentials.id()));
    }

    @Operation(summary = "방 퇴장", description = "방 퇴장")
    @PostMapping("/leave/{roomId}")
    public ResponseEntity<Void> leave(
            @PathVariable Long roomId,
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials
    ){
        roomService.leave(authCredentials.id(),roomId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "방 목록", description = "방 목록")
    @GetMapping("/list")
    public ResponseEntity<RoomListResponse> list(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials
    ){
        List<RoomDto> roomList = roomService.list();
        return ResponseEntity.ok(RoomListResponse.of(roomList));
    }
}
