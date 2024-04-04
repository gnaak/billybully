package billybully.auth.infra.kakao.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;


@Builder
public record Profile(
    @JsonProperty("thumbnail_image_url")
    String picture,
    @JsonProperty("nickname")
    String name
) {
}
