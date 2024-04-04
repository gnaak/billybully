package billybully.auth.presentation;

import billybully.auth.support.BearerTokenExtractor;
import billybully.auth.support.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        if(isPreflightRequest(request)) {
            return true;
        }
        String accessToken = BearerTokenExtractor.extract(request);
        jwtProvider.validateParseJws(accessToken);
        return true;
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        if(!request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString())){
            return false;
        }
        if(!Objects.nonNull(request.getHeader("Access-Control-Request-Headers"))){
            return false;
        }
        if(!Objects.nonNull(request.getHeader("Access-Control-Request-Method"))){
            return false;
        }
        if(!Objects.nonNull(request.getHeader("Origin"))){
            return false;
        }

        return true;
    }
}
