package billybully.game.domain.repository;


import billybully.game.domain.Situation;
import billybully.game.exception.SituationNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SituationRepository extends JpaRepository<Situation, Integer> {
    default Situation getById(Integer id) {
        return findById(id)
                .orElseThrow(SituationNotFoundException::new);
    }
}
