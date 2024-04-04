package billybully.auth.domain;

import billybully.auth.dto.OAuthMemberResponse;
import billybully.member.domain.SocialType;

public interface OAuthClient {
    OAuthMemberResponse request(String authCode);
    SocialType getSocialType();
}
