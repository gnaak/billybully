package billybully.game.domain.repository;

import billybully.game.domain.Issue;
import billybully.game.exception.IssueNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Integer> {
    default Issue getById(Integer id){
        return findById(id)
                .orElseThrow(IssueNotFoundException::new);
    }
}
