package billybully.auth.domain;

public interface OAuthTokenClient {
    public String getAccessToken(String authCode, String redirectUri);
}
