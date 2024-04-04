package billybully.game.presentation;

import billybully.auth.dto.AuthCredentials;
import billybully.auth.presentation.Auth;
import billybully.game.application.GameService;
import billybully.game.dto.request.PerformActionRequest;
import billybully.game.dto.response.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/game")
public class GameController {

    private GameService gameService;

    @Operation(summary = "게임 시작", description = "게임 시작")
    @GetMapping("/{roomId}")
    public ResponseEntity<StartGameResponses> startGame(@PathVariable("roomId") Long roomId) {

        return new ResponseEntity<>(gameService.startGame(roomId), HttpStatus.OK);
    }

    @Operation(summary = "액션 수행", description = "플레이어를 이동, 도착한 칸의 액션을 수행, start 칸을 지난 경우 월 수입 반영")
    @PostMapping("/{action}")
    public ResponseEntity<PersonalPropertyResponse> performAction(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials,
            @PathVariable("action") String action,
            @Valid @RequestBody PerformActionRequest performActionRequest) {
        PersonalPropertyResponse personalPropertyResponse =
                gameService.performAction(authCredentials.id(), action, performActionRequest.cardId(),
                        performActionRequest.destination(), performActionRequest.salary());
        return new ResponseEntity<>(personalPropertyResponse, HttpStatus.OK);
    }

    @Operation(summary = "재테크 카드 3장 보여주기", description = "재테크 카드 랜덤으로 3장 보여주기")
    @GetMapping("/fintech")
    public ResponseEntity<FintechCardsResponse> getFintechCards(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials
    ) {
        return new ResponseEntity<>(gameService.getFintechCards(authCredentials.id()), HttpStatus.OK);
    }


    @Operation(summary = "이슈 카드 1장 보여주기", description = "이슈 카드 랜덤으로 1장 보여주기")
    @GetMapping("/issue")
    public ResponseEntity<IssueCardResponse> getIssueCard() {
        return new ResponseEntity<>(gameService.getIssueCard(), HttpStatus.OK);
    }

    @Operation(summary = "재산 목록 조회", description = "전체 재산 목록 조회하기")
    @GetMapping("/money")
    public ResponseEntity<PropertiesResponse> getTotalPropertyList(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        return new ResponseEntity<>(gameService.getTotalPropertyList(authCredentials.id()), HttpStatus.OK);
    }

    @Operation(summary = "상황 적용", description = "해당하는 상황에 따른 금액 변동 재테크 카드에 반영하기")
    @PostMapping("/situation/{situationId}")
    public ResponseEntity<PropertiesResponse> applySituation(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials,
            @PathVariable("situationId") Integer situationId
    ) {
        return new ResponseEntity<>(gameService.applySituation(authCredentials.id(), situationId), HttpStatus.OK);
    }

    @Operation(summary = "재테크 팔기", description = "재테크 팔기")
    @PostMapping("/sale/{fintechId}")
    public ResponseEntity<PersonalPropertyResponse> sellFintech(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials,
            @PathVariable("fintechId") Integer fintechId
    ) {
        return new ResponseEntity<>(gameService.sellFintech(authCredentials.id(), fintechId), HttpStatus.OK);
    }

    @Operation(summary = "대출 받기", description = "대출 받기")
    @PostMapping("/loan/{amount}")
    public ResponseEntity<PersonalPropertyResponse> loanMoney(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials,
            @PathVariable("amount") Integer amount
    ) {
        return new ResponseEntity<>(gameService.loanMoney(authCredentials.id(), amount), HttpStatus.OK);
    }

    @Operation(summary = "대출금 상환하기", description = "대출금 상환하기")
    @PostMapping("/repayment/{amount}")
    public ResponseEntity<PersonalPropertyResponse> repayLoan(
            @Parameter(hidden = true)  @Auth AuthCredentials authCredentials,
            @PathVariable("amount") Integer amount
    ) {
        return new ResponseEntity<>(gameService.repayLoan(authCredentials.id(), amount), HttpStatus.OK);
    }

    @Operation(summary = "게임 종료", description = "게임 종료")
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> endGame(@PathVariable("roomId") Long roomId) {
        gameService.endGame(roomId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
