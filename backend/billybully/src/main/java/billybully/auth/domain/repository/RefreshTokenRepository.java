package billybully.auth.domain.repository;

import billybully.auth.domain.RefreshToken;
import billybully.auth.exception.RefreshTokenNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    default RefreshToken getByToken(String token) {
        return findByToken(token).orElseThrow(RefreshTokenNotFoundException::new);
    }

    void deleteByMemberId(Long memberId);

}
