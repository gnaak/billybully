package billybully.auth.domain;

import billybully.auth.dto.OAuthMemberResponse;
import org.springframework.stereotype.Component;

public interface OAuthMemberInfoClient {
    OAuthMemberResponse getMemberInfo(String accessToken);
}
