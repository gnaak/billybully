package billybully.auth.infra.kakao.dto;

import billybully.auth.dto.OAuthMemberResponse;
import billybully.auth.infra.kakao.domain.KakaoAccount;
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
public class KakaoMemberResponse implements OAuthMemberResponse {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Override
    public String getEmail() {
        return kakaoAccount.email();
    }

    @Override
    public String getName() {
        return kakaoAccount.profile().name();
    }

    @Override
    public String getPicture() {
        return kakaoAccount.profile().picture();
    }

    @Override
    public Member toMember() {
        return Member.builder().name(getName()).email(getEmail()).profile(getPicture()).socialType(getSocialType())
                .build();
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.KAKAO;
    }
}
