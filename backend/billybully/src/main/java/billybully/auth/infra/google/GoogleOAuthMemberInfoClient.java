package billybully.auth.infra.google;

import billybully.auth.domain.OAuthMemberInfoClient;
import billybully.auth.dto.OAuthMemberResponse;
import billybully.auth.infra.google.dto.GoogleMemberResponse;
import billybully.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpMethod.GET;

@Component
@RequiredArgsConstructor
public class GoogleOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://www.googleapis.com/userinfo/v2/me";

    private final RestTemplate restTemplate;

    @Override
    public OAuthMemberResponse getMemberInfo(String accessToken) {
        HttpEntity<HttpHeaders> request = createRequest(accessToken);
        ResponseEntity<GoogleMemberResponse> response = getGoogleMember(request);
        return response.getBody();
    }

    private HttpEntity<HttpHeaders> createRequest(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return new HttpEntity<>(headers);
    }

    private ResponseEntity<GoogleMemberResponse> getGoogleMember(HttpEntity<HttpHeaders> request) {
        try {
            return restTemplate.exchange(
                    USER_INFO_URI,
                    GET,
                    request,
                    GoogleMemberResponse.class);
        } catch (HttpClientErrorException e) {
            throw new MemberNotFoundException();
        }
    }
}
