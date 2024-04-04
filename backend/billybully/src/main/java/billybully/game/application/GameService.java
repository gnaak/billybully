package billybully.game.application;

import billybully.game.domain.*;
import billybully.game.domain.repository.*;
import billybully.game.dto.response.*;
import billybully.game.exception.*;
import billybully.game.exception.SituationNotFoundException;
import billybully.member.domain.Member;
import billybully.member.domain.repository.MemberRepository;
import billybully.room.domain.Player;
import billybully.room.domain.Room;
import billybully.room.domain.respository.PlayerRepository;
import billybully.room.domain.respository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {

    private final SituationRepository situationRepository;
    private final SituationEffectRepository situationEffectRepository;
    private final FintechRepository fintechRepository;
    private final FintechPossessionRepository fintechPossessionRepository;
    private final IssueRepository issueRepository;
    private final PlayerRepository playerRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private static final int MONTHLY_PAY = 10000000; //월급 1천만원
    private static final int NUM_OF_SITUATIONS = 10; //상황카드 총 10개
    private static final int SITUATION_PER_GAME = 5; // 1개의 게임에 상황 5개
    private static final int NUM_OF_FINTECH = 35; //재테크 카드 총 35개
    private static final int FINTECH_PER_CHOICE = 3; // 재테크 카드 3개 중에 1개 뽑음
    private static final int NUM_OF_ISSUE = 12; //이슈 카드 총 12개
    private static final int INTEREST_RATE = 10; // 1개의 게임에 상황 5개
    private static final int MAX_LOAN = 200000000; // 대출 한도

    @Transactional(readOnly = true)
    public StartGameResponses startGame(Long roomId) throws SituationNotFoundException {
        //game_started를 true로 바꾼다
        Room room = roomRepository.getById(roomId);
        room.changeStatus(true);

        //랜덤으로 상황 5개 뽑기. 1~10 중에서.
        Set<Integer> situationNums = new HashSet<>();
        Random random = new SecureRandom();
        while (situationNums.size() != SITUATION_PER_GAME) {
            int randomNumber = random.nextInt(NUM_OF_SITUATIONS) + 1;
            situationNums.add(randomNumber);
        }

        List<Situation> situations = situationNums.stream()
                .map(situationRepository::getById)
                .collect(Collectors.toList());

        return StartGameResponses.of(situations);
    }

    public void getIncome(Player player) {
        int updatedCash = player.getCash();
        //월급 1000만원 추가
        updatedCash += MONTHLY_PAY;

        //대출이자 (빚의 10%)
        updatedCash -= player.getLoan() / 100 * INTEREST_RATE;

        //재테크 수입 추가
        Integer fintechIncome = fintechPossessionRepository.getFintechIncome(player.getId());
        updatedCash += fintechIncome;
        if (updatedCash < 0) {
            updatedCash = 0;
        }
        player.updateCash(updatedCash);
    }

    /*
    public enum Actions {
        FINTECH,
        DOUBLE,
        HALF,
        ISSUE
    }
    */

    public PersonalPropertyResponse performAction(Long memberId, String action, Integer cardId, Integer destination, Boolean salary) {
        // 추후 Action별로 만들어서 전략패턴을 사용하기
        // Actions actions = Actions.valueOf(action);
        // Map<Actions, ActionStrategy> actionStratetes = new HashMap<>();

        Player player = playerRepository.getByMemberId(memberId);

        //한 달 지남
        if (salary) {
            getIncome(player);
        }

        //위치 저장
        player.moveTo(destination);

        //재테크 구매
        if (action.equals("FINTECH") && cardId != 0) {
            //구매할 재테크 찾아서
            Fintech fintech = fintechRepository.getById(cardId);

            if (player.getCash() < fintech.getBuyPrice()) {
                throw new NotEnoughCashException();
            }

            //보유재테크로 저장
            FintechPossession fintechPossession = FintechPossession.of(player, fintech.getType(), fintech.getId());
            fintechPossessionRepository.save(fintechPossession);

            int updatedCash = player.getCash() - fintech.getBuyPrice();

            player.updateCash(updatedCash);
        }

        //재테크 판매
        if (action.equals("DOUBLE") && cardId != 0) {
            updateProperty(cardId, player, true);
        }

        if (action.equals("HALF") && cardId != 0) {
            updateProperty(cardId, player, false);
        }

        if (action.equals("ISSUE")) {
            Issue issue = issueRepository.getById(cardId);
            int updatedCash = player.getCash();
            updatedCash += issue.getBalance();
            if (updatedCash < 0) {
                updatedCash = 0;
            }
            player.updateCash(updatedCash);
        }

        return getPersonalPropertyList(memberId);
    }


    private void updateProperty(Integer cardId, Player player, boolean isDouble) {
        Fintech fintech = fintechRepository.getById(cardId);
        //재산에서 제거
        fintechPossessionRepository.deleteByFintechIdAndPlayer(fintech.getId(), player);

        //현금에 반영
        int updatedCash = isDouble ? player.getCash() + fintech.getSellPrice() * 2 : player.getCash() + fintech.getSellPrice() / 2;
        player.updateCash(updatedCash);
    }

    @Transactional(readOnly = true)
    public FintechCardsResponse getFintechCards(Long memberId) {
        //랜덤으로 재테크 카드 3개 뽑기. 1~35 중에서.
        List<Integer> fintechNums = new ArrayList<>();

        //이미 해당 게임의 플레이어들이 보유한 재테크 카드 집합
        Set<Integer> finteches = new HashSet<>();
        List<Long> players = playerRepository.getAllPlayers(memberId);
        for (Long playerId : players) {
            finteches.addAll(
                    fintechPossessionRepository.getFintechList(playerId).stream()
                            .map(f -> f.getId())
                            .collect(Collectors.toSet())
            );
        }

        Random random = new SecureRandom();
        while (fintechNums.size() != FINTECH_PER_CHOICE) {
            int num = random.nextInt(NUM_OF_FINTECH) + 1;
            if (!finteches.contains(num)) {
                fintechNums.add(num);
            }
        }
        List<Fintech> fintechList = fintechNums.stream()
                .map(fintechRepository::getById)
                .toList();
        return FintechCardsResponse.from(fintechList);
    }

    @Transactional(readOnly = true)
    public IssueCardResponse getIssueCard() {
        //랜덤으로 이슈 카드 1개 뽑기. 1~12 중에서.
        Random random = new SecureRandom();
        int num = random.nextInt(NUM_OF_ISSUE) + 1;
        Issue issue = issueRepository.getById(num);
        return IssueCardResponse.from(issue);
    }

    @Transactional(readOnly = true)
    public PropertiesResponse getTotalPropertyList(Long memberId) {
        Member member = memberRepository.getById(memberId);
        Player me = playerRepository.getByMemberId(memberId);
        List<Fintech> finteches = fintechPossessionRepository.getFintechList(me.getId());

        List<OtherPropertiesResponse> otherPropertiesResponses = playerRepository.getPlayers(memberId)
                .stream()
                .map(fintechPossessionRepository::getProperty)
                .toList();

        PersonalPropertyResponse myProperty = PersonalPropertyResponse.of(member.getId(), member.getName(), member.getProfile(), me.getCash(), me.getLoan(), finteches);
        return PropertiesResponse.of(myProperty, otherPropertiesResponses);
    }

    @Transactional(readOnly = true)
    public PropertiesResponse applySituation(Long memberId, Integer situationId) {
        Situation situation = situationRepository.getById(situationId);
        //상황 아이디로 영향 받는 재테크 아이디와 등락률 받아 와서 금액 업데이트
        List<SituationEffect> situationEffects = situationEffectRepository.findBySituation(situation);
        for (SituationEffect situationEffect : situationEffects) {
            Integer fintechId = situationEffect.getFintechId();
            Integer percentage = situationEffect.getPercentage();

            Fintech fintech = fintechRepository.getById(fintechId);
            double effect = (100 + percentage) / 100.0;
            fintech.applySituationEffect(effect);
        }
        return getTotalPropertyList(memberId);
    }

    /**
     * 개인 재산 구하는 메서드
     */
    @Transactional(readOnly = true)
    public PersonalPropertyResponse getPersonalPropertyList(Long memberId) {
        Member member = memberRepository.getById(memberId);
        Player player = playerRepository.getByMemberId(memberId);
        //재산목록 리턴
        List<Fintech> fintechList = fintechPossessionRepository.getFintechList(player.getId());
        return PersonalPropertyResponse.of(memberId, member.getName(), member.getProfile(), player.getCash(), player.getLoan(), fintechList);
    }

    public PersonalPropertyResponse sellFintech(Long memberId, Integer fintechId) {
        Player player = playerRepository.getByMemberId(memberId);

        fintechPossessionRepository.deleteByFintechIdAndPlayer(fintechId, player);
        Fintech fintech = fintechRepository.getById(fintechId);
        player.updateCash(player.getCash() + fintech.getSellPrice());

        return getPersonalPropertyList(memberId);
    }

    public PersonalPropertyResponse loanMoney(Long memberId, Integer amount) {
        Player player = playerRepository.getByMemberId(memberId);
        if (player.getLoan() + amount > MAX_LOAN) {
            throw new MaxLoanLimitException();
        }
        player.loanMoney(amount);

        return getPersonalPropertyList(memberId);
    }

    public PersonalPropertyResponse repayLoan(Long memberId, Integer amount) {
        Player player = playerRepository.getByMemberId(memberId);
        if (player.getLoan() - amount < 0) {
            throw new MinLoanLimitException();
        }
        if (player.getCash() - amount < 0) {
            throw new NotEnoughCashException();
        }
        player.repayLoan(amount);

        return getPersonalPropertyList(memberId);
    }

    public void endGame(Long roomId) {
        //game_started를 false로 바꾼다
        Room room = roomRepository.getById(roomId);
        room.changeStatus(false);

        //게임 플레이어들의 보유 재테크 초기화
        //방 안에 있는 멤버들의 재산 초기화
        List<FintechPossession> fintechPossessionList = fintechPossessionRepository.findPlayersProperty(roomId);
        fintechPossessionRepository.deleteAll(fintechPossessionList);
        //현금, 빚 초기화
        List<Player> players = playerRepository.findByRoomId(roomId);

        for (Player player : players) {
            player.initMoney();
        }
    }
}
