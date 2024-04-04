package billybully.auth.dto;


import billybully.member.domain.Member;
import billybully.member.domain.SocialType;

public interface OAuthMemberResponse {
    String getEmail();
    String getName();
    String getPicture();
    Member toMember();
    SocialType getSocialType();
}
