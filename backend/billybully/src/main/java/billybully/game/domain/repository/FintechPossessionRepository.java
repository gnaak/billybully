package billybully.game.domain.repository;


import billybully.game.domain.Fintech;
import billybully.game.domain.FintechPossession;
import billybully.game.dto.response.OtherPropertiesResponse;
import billybully.member.domain.Member;
import billybully.room.domain.Player;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FintechPossessionRepository extends JpaRepository<FintechPossession,Integer>, CustomFintechPossessionRepository {
    void deleteByFintechIdAndPlayer(Integer fintechId, Player player);

    List<FintechPossession> findByPlayer(Player player);

}

interface CustomFintechPossessionRepository{
    List<FintechPossession> findPlayersProperty(Long roomId);

    Integer getFintechIncome(Long playerId);

    List<Fintech> getFintechList(Long playerId);

    OtherPropertiesResponse getProperty(Long playerId);
}
