package billybully.auth.infra.kakao;

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
public class KakaoOAuthClient implements OAuthClient {

    private final OAuthTokenClient kakaoOAuthTokenClient;
    private final OAuthMemberInfoClient kakaoOAuthMemberInfoClient;

    @Value("${oauth.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Override
    public OAuthMemberResponse request(String authCode) {
        String accessToken = kakaoOAuthTokenClient.getAccessToken(authCode, kakaoRedirectUri);
        return kakaoOAuthMemberInfoClient.getMemberInfo(accessToken);
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.KAKAO;
    }
}
