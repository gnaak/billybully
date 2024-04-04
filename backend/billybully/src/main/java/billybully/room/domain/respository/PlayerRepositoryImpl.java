package billybully.room.domain.respository;

import billybully.room.domain.QPlayer;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class PlayerRepositoryImpl implements CustomPlayerRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> getPlayers(Long memberId) {
        QPlayer player = QPlayer.player;
        return queryFactory
                .select(player.memberId)
                .from(player)
                .where(player.roomId.eq(
                        JPAExpressions
                                .select(player.roomId)
                                .from(player)
                                .where(player.memberId.eq(memberId)))
                        .and(player.memberId.ne(memberId)))
                .fetch();
    }

    @Override
    public List<Long> getAllPlayers(Long memberId) {
        QPlayer player = QPlayer.player;
        return queryFactory
                .select(player.id)
                .from(player)
                .where(player.roomId.eq(
                                JPAExpressions
                                        .select(player.roomId)
                                        .from(player)
                                        .where(player.memberId.eq(memberId)))
                        )
                .fetch();
    }
}
