package billybully.auth.support;

import billybully.auth.exception.TokenExpiredException;
import billybully.auth.exception.TokenInvalidException;
import billybully.common.config.JwtCredentials;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.UUID;

import static io.jsonwebtoken.security.Keys.hmacShaKeyFor;
import static java.nio.charset.StandardCharsets.UTF_8;

@Component
public class JwtProvider {

    private final SecretKey key;

    private final long accessTokenExpirationTime;

    private final long refreshTokenExpirationTime;

    public JwtProvider(JwtCredentials jwtCredentials) {
        this.key = hmacShaKeyFor(jwtCredentials.getSecretKey().getBytes(UTF_8));
        this.accessTokenExpirationTime = jwtCredentials.getAccessTokenExpirationTime();
        this.refreshTokenExpirationTime = jwtCredentials.getRefreshTokenExpirationTime();
    }

    public String createAccessToken(Long memberId) {
        return createToken(memberId.toString(), accessTokenExpirationTime, key);
    }

    private String createToken(String payload, long expireLength, SecretKey key) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expireLength);
        return Jwts.builder().setSubject(String.valueOf(payload)).setIssuedAt(now).setExpiration(expiration).signWith(key, SignatureAlgorithm.HS256).compact();
    }

    public String createRefreshToken() {
        return createToken(UUID.randomUUID().toString(), refreshTokenExpirationTime, key);
    }

    public boolean validateParseJws(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e){
            throw new TokenExpiredException();
        } catch (JwtException e){
            throw new TokenInvalidException();
        }
    }

    public String getPayLoad(String token){
        Jws<Claims> parsedToken = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
        String payload = parsedToken.getBody().getSubject();
        return payload;
    }
}
