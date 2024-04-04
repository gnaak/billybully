package billybully.auth.infra.google.dto;

import billybully.auth.dto.OAuthMemberResponse;
import billybully.member.domain.Member;
import billybully.member.domain.SocialType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleMemberResponse implements OAuthMemberResponse {

    private String email;
    @JsonProperty("name")
    private String name;
    private String picture;

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getPicture() {
        return picture;
    }

    @Override
    public Member toMember() {
        return Member.builder().name(getName()).email(getEmail()).profile(getPicture()).socialType(getSocialType()).build();
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.GOOGLE;
    }
}
