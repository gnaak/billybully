package billybully.member.domain.repository;

import billybully.member.domain.Member;
import billybully.member.domain.SocialType;
import billybully.member.exception.MemberNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndSocialType(String email, SocialType socialType);

    Optional<Member> findById(Long id);

    default Member getById(Long id) {
        return findById(id)
                .orElseThrow(MemberNotFoundException::new);
    }
}
