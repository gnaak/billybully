package billybully.auth.infra.google;

import billybully.auth.domain.OAuthClient;
import billybully.auth.domain.OAuthMemberInfoClient;
import billybully.auth.domain.OAuthTokenClient;
import billybully.auth.dto.OAuthMemberResponse;
import billybully.member.domain.SocialType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoogleOAuthClient implements OAuthClient {

    private final OAuthTokenClient googleOAuthTokenClient;
    private final OAuthMemberInfoClient googleOAuthMemberInfoClient;

    @Value("${oauth.google.redirect-uri}")
    private String googleRedirectUri;

    @Override
    public OAuthMemberResponse request(String authCode) {
        String accessToken = googleOAuthTokenClient.getAccessToken(authCode, googleRedirectUri);
        return googleOAuthMemberInfoClient.getMemberInfo(accessToken);
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.GOOGLE;
    }
}
