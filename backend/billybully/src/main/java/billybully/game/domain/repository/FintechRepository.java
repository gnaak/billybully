package billybully.game.domain.repository;

import billybully.game.domain.Fintech;
import billybully.game.exception.FintechNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FintechRepository extends JpaRepository<Fintech, Integer> {
    default Fintech getById(Integer id) {
        return findById(id)
                .orElseThrow(FintechNotFoundException::new);
    }
}