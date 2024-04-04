package billybully.common.config;

import billybully.auth.infra.google.config.GoogleCredentials;
import billybully.auth.infra.kakao.config.KakaoCredentials;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
        KakaoCredentials.class,
        GoogleCredentials.class,
        JwtCredentials.class
})
public class Appconfig {
}
