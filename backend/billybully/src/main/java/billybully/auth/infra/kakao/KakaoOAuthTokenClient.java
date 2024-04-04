package billybully.auth.infra.kakao;

import billybully.auth.domain.OAuthTokenClient;

import billybully.auth.exception.TokenMissingException;
import billybully.auth.infra.kakao.config.KakaoCredentials;
import billybully.auth.infra.kakao.dto.KakaoAccessTokenResponse;
import billybully.common.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

import static java.util.Objects.requireNonNull;

@Component
@RequiredArgsConstructor
public class KakaoOAuthTokenClient implements OAuthTokenClient {
    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.access-token-uri}")
    private String accessTokenUri;

    private final KakaoCredentials kakaoCredentials;

    private final RestTemplate restTemplate;
    @Override
    public String getAccessToken(String authCode, String redirectUri) {
        HttpHeaders header = createHeader();
        MultiValueMap<String, String> body = createBody(authCode, redirectUri);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, header);
        ResponseEntity<KakaoAccessTokenResponse> response = sendRequest(request);
        System.out.println("response: "+response);
        return requireNonNull(requireNonNull(response.getBody())).accessToken();
    }

    private HttpHeaders createHeader(){
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return header;
    }

    private MultiValueMap<String, String> createBody(String authCode, String redirectUri){
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", kakaoCredentials.getClientId());
        body.add("redirect_uri", redirectUri);
        body.add("client_secret", kakaoCredentials.getClientSecret());
        body.add("code", authCode);
        return body;
    }

    private ResponseEntity<KakaoAccessTokenResponse> sendRequest(HttpEntity<MultiValueMap<String, String>> request){
        try {
            System.out.println("request"+request);
            return restTemplate.exchange(
                    accessTokenUri,
                    HttpMethod.POST,
                    request,
                    KakaoAccessTokenResponse.class
            );
        }catch (HttpClientErrorException e){
            throw new TokenMissingException();
        }
    }
}
