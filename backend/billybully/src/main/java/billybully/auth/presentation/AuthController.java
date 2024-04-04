package billybully.auth.presentation;

import billybully.auth.application.AuthService;
import billybully.auth.dto.AccessTokenResponse;
import billybully.auth.dto.AuthCredentials;
import billybully.auth.dto.LoginResponse;
import billybully.auth.dto.TokenDto;
import billybully.auth.support.JwtProvider;
import billybully.auth.support.RefreshTokenExtractor;
import billybully.member.application.MemberService;
import billybully.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "OAuth 2.0", description = "로그인 API")
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @Operation(summary = "로그인", description = "로그인")
    @PostMapping("/login/{provider}")
    public ResponseEntity<LoginResponse> login(
            @PathVariable String provider,
            @RequestParam String authCode
    ){
        TokenDto tokenDto = authService.login(authCode, provider);
        String memberId = jwtProvider.getPayLoad(tokenDto.accessToken());
        Member member = memberService.findMember(Long.valueOf(memberId));
            return ResponseEntity.ok(LoginResponse.of(tokenDto,member));
    }

    @Operation(summary = "로그아웃", description = "로그아웃 처리")
    @GetMapping("/logout")
    public ResponseEntity<Void> logout(
            @Parameter(description = "인증 정보", required = true, schema = @Schema(implementation = AuthCredentials.class)) @Auth AuthCredentials authCredentials
    ){
        authService.logout(authCredentials.id());
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "토큰 갱신", description = "엑세스 토큰 갱신")
    @GetMapping("/refresh")
    public ResponseEntity<AccessTokenResponse> renewTokens(HttpServletRequest request){
        String refreshToken = RefreshTokenExtractor.extract(request);
        String accessToken = authService.renewAccessTokenBy(refreshToken);
        return ResponseEntity.ok(AccessTokenResponse.from(accessToken));
    }
}
