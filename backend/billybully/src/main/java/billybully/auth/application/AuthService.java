package billybully.auth.application;

import billybully.auth.domain.OAuthClients;
import billybully.auth.domain.RefreshToken;
import billybully.auth.domain.repository.RefreshTokenRepository;
import billybully.auth.dto.OAuthMemberResponse;
import billybully.auth.dto.TokenDto;
import billybully.auth.support.JwtProvider;
import billybully.member.domain.Member;
import billybully.member.domain.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final OAuthClients oAuthClient;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public TokenDto login(String authCode, String provider){
        OAuthMemberResponse oAuthMemberResponse = oAuthClient.request(authCode, provider);
        Member member = memberRepository.findByEmailAndSocialType(oAuthMemberResponse.getEmail(), oAuthMemberResponse.getSocialType())
                .orElseGet(() -> memberRepository.save(oAuthMemberResponse.toMember()));
        return createToken(member.getId());
    }

    private TokenDto createToken(Long memberId) {
        String accessToken = jwtProvider.createAccessToken(memberId);
        String refreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.deleteByMemberId(memberId);
        refreshTokenRepository.save(new RefreshToken(memberId, refreshToken));

        return TokenDto.of(accessToken, refreshToken);
    }

    public void logout(Long memberId){
        refreshTokenRepository.deleteByMemberId(memberId);
    }


    public String renewAccessTokenBy(String refreshToken) {
        jwtProvider.validateParseJws(refreshToken);

        RefreshToken saveRefreshToken = refreshTokenRepository.getByToken(refreshToken);
        Long memberId = saveRefreshToken.getMemberId();

        return jwtProvider.createAccessToken(memberId);
    }
}




