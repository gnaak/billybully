package billybully.member.application;

import billybully.member.domain.Member;
import billybully.member.domain.repository.MemberRepository;
import billybully.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    public  Member findMember(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException());
        return member;
    }
}
