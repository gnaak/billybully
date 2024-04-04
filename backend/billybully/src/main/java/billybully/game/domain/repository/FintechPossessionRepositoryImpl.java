package billybully.game.domain.repository;

import billybully.game.domain.Fintech;
import billybully.game.domain.FintechPossession;
import billybully.game.dto.response.OtherPropertiesResponse;
import billybully.game.exception.PlayerNotFoundException;
import billybully.member.domain.Member;
import billybully.member.domain.repository.MemberRepository;
import billybully.room.domain.Player;
import billybully.room.domain.respository.PlayerRepository;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static billybully.room.domain.QPlayer.player;
import static billybully.game.domain.QFintechPossession.fintechPossession;
import static billybully.game.domain.QFintech.fintech;

@RequiredArgsConstructor
public class FintechPossessionRepositoryImpl implements CustomFintechPossessionRepository {
    private final JPAQueryFactory queryFactory;
    private final MemberRepository memberRepository;
    private final PlayerRepository playerRepository;

    @Override
    public List<FintechPossession> findPlayersProperty(Long roomId) {
        return queryFactory
                .selectFrom(fintechPossession)
                .where(fintechPossession.player.in(
                        JPAExpressions
                                .selectFrom(player)
                                .where(player.roomId.eq(roomId))))
                .fetch();
    }

    @Override
    public Integer getFintechIncome(Long playerId) {

        Integer incomeSum = queryFactory
                .select(fintech.income.sum())
                .from(fintechPossession)
                .innerJoin(player).on(fintechPossession.player.eq(player))
                .innerJoin(fintech).on(fintechPossession.fintechId.eq(fintech.id))
                .where(player.id.eq(playerId))
                .fetchOne();

        return incomeSum != null ? incomeSum : 0;

    }

    @Override
    public List<Fintech> getFintechList(Long playerId) {

        return queryFactory
                .select(fintech)
                .from(fintechPossession)
                .innerJoin(player).on(fintechPossession.player.eq(player))
                .innerJoin(fintech).on(fintechPossession.fintechId.eq(fintech.id))
                .where(player.id.eq(playerId))
                .fetch();

    }

    @Override
    public OtherPropertiesResponse getProperty(Long memberId) {
        Member member = memberRepository.getById(memberId);
        Player p = playerRepository.findByMemberId(memberId).orElseThrow(PlayerNotFoundException::new);

        List<Fintech> fintechList = queryFactory
                .select(fintech)
                .from(fintechPossession)
                .innerJoin(player).on(fintechPossession.player.eq(player))
                .innerJoin(fintech).on(fintechPossession.fintechId.eq(fintech.id))
                .where(player.memberId.eq(memberId))
                .fetch();

        return OtherPropertiesResponse.of(member.getId(), member.getName(), member.getProfile(), p, fintechList);
    }
}
