package billybully.auth.dto;

import billybully.member.domain.Member;

public record AuthResponse(
    Long memberId,
    String memberProfile,
    String memberEmail,
    String memberName
){
    public static AuthResponse of(Member member){
        return new AuthResponse(
                member.getId(),
                member.getProfile(),
                member.getEmail(),
                member.getName());
    }
}
