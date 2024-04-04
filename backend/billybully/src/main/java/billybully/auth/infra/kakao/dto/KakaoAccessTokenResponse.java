package billybully.auth.infra.kakao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoAccessTokenResponse (
        String tokenType,
        String accessToken,
        String expiresIn,
        String refreshToken,
        String refreshTokenExpiresIn,
        String scope
){
}
