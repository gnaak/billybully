package billybully.auth.support;

import billybully.auth.exception.TokenMissingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class RefreshTokenExtractor {

    private static String header = "Refresh";
    public static String extract(HttpServletRequest request){
        String authorization = request.getHeader(header);
        validate(authorization);
        return authorization.trim();
    }

    private static void validate(String authorization){
        if(authorization == null){
            throw new TokenMissingException();
        }
    }
}
