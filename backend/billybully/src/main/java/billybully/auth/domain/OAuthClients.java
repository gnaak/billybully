package billybully.auth.domain;

import billybully.auth.dto.OAuthMemberResponse;
import billybully.auth.infra.kakao.KakaoOAuthClient;
import billybully.member.domain.SocialType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;


@Component
public class OAuthClients {
    Map<SocialType, OAuthClient> values = new EnumMap<>(SocialType.class);

    public OAuthClients(Set<OAuthClient> clients) {
        clients.forEach(client -> values.put(client.getSocialType(), client));
    }

    public OAuthMemberResponse request(String authCode, String provider){
        SocialType socialType = SocialType.valueOf(provider);
        OAuthClient oAuthClient = values.get(socialType);
        return oAuthClient.request(authCode);
    }
}
