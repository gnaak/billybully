package billybully.auth.infra.kakao.domain;

import lombok.Builder;
import lombok.Getter;

@Builder
public record KakaoAccount (
        String email,
        Profile profile
){
}
