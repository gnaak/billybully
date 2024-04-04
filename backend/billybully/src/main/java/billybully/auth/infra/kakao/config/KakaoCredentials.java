package billybully.auth.infra.kakao.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@RequiredArgsConstructor
@ConfigurationProperties(prefix="oauth.kakao")
public class KakaoCredentials {
    private final String clientId;
    private final String redirectUri;
    private final String clientSecret;
}
