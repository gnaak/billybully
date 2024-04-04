package billybully.auth.infra.kakao;

import billybully.auth.domain.OAuthMemberInfoClient;
import billybully.auth.infra.kakao.dto.KakaoMemberResponse;
import billybully.auth.dto.OAuthMemberResponse;
import billybully.auth.exception.TokenInvalidException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class KakaoOAuthMemberInfoClient implements OAuthMemberInfoClient {

    @Value("${oauth.kakao.member-info-uri}")
    private String memberInfoUri;

    private final RestTemplate restTemplate;

    @Override
    public OAuthMemberResponse getMemberInfo(String accessToken) {
        System.out.println("getMemberInfo: "+accessToken);
        HttpHeaders header = createHeader(accessToken);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(header);
        ResponseEntity<KakaoMemberResponse> response = sendRequest(request);
        return response.getBody();
    }

    private HttpHeaders createHeader(String accessToken){
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        header.setBearerAuth(accessToken);
//        header.set("Authorization", "Bearer "+accessToken);
        return header;
    }

    private ResponseEntity<KakaoMemberResponse> sendRequest(HttpEntity<MultiValueMap<String, String>> request){
        try{
            System.out.println("request: "+request);
            return restTemplate.exchange(
                memberInfoUri,
                HttpMethod.GET,
                request,
                KakaoMemberResponse.class
            );
        } catch (HttpClientErrorException e){
            System.out.println("error: "+e);
            throw new TokenInvalidException();
        }
    }
}
