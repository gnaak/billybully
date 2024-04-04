package billybully.auth.support;

import billybully.auth.exception.TokenMissingException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.parser.Authorization;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class BearerTokenExtractor {
    private static final String BEARER_TYPE = "Bearer";

    public static String extract(HttpServletRequest request){
        String authorization = request.getHeader(AUTHORIZATION);
        validate(authorization);
        return authorization.replace(BEARER_TYPE,"").trim();
    }

    private static void validate(String authorization){
        if(authorization == null){
            throw new TokenMissingException();
        }
    }
}
