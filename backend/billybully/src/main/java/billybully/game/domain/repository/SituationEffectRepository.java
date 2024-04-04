package billybully.game.domain.repository;


import billybully.game.domain.Situation;
import billybully.game.domain.SituationEffect;
import billybully.game.exception.SituationEffectNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SituationEffectRepository extends JpaRepository<SituationEffect,Integer> {
    default SituationEffect getById(Integer id){
        return findById(id)
                .orElseThrow(SituationEffectNotFoundException::new);
    }

    List<SituationEffect> findBySituation(Situation situation);
}
