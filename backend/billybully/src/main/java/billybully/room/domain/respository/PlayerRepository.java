package billybully.room.domain.respository;

import billybully.game.exception.PlayerNotFoundException;
import billybully.room.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>, CustomPlayerRepository {
    void deleteByMemberId(Long memberId);
    default Player getByMemberId(Long memberId){
        return findByMemberId(memberId)
                .orElseThrow(PlayerNotFoundException::new);
    }

    Optional<Player> findByMemberId(Long memberId);

    List<Player> findByRoomId(Long roomId);
}
interface CustomPlayerRepository {
    List<Long> getPlayers(Long memberId);

    List<Long> getAllPlayers(Long memberId);
}