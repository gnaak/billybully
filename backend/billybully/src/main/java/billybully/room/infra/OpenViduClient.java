package billybully.room.infra;

import billybully.room.Exception.ConnectionPropertiesInvalidException;
import billybully.room.Exception.SessionNotExistException;
import billybully.room.Exception.SessionPropertiesInvalidException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.PrePersist;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class OpenViduClient {
    @Value("${openvidu.uri}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;
    private static final String CODEC = "VP8";

    @PostConstruct
    public void init() {
        openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String createRequest(String name) {
        SessionProperties sessionProperties = getSessionProperties(name);
        Session session = sendCreateSessionRequest(sessionProperties);
        return sendConnectionRequest(session);
    }

    public String enterRequest(String name){
        Session session = sendEnterSessionRequest(name);
        return sendConnectionRequest(session);
    }

    public String sendConnectionRequest(Session session){
        ConnectionProperties property = new ConnectionProperties.Builder().build();
        try{
            Connection connection = session.createConnection(property);
            return connection.getToken();
        } catch (OpenViduException e){
            throw new ConnectionPropertiesInvalidException();
        }
    }

    public Session sendCreateSessionRequest(SessionProperties sessionProperties){
        try{
            return openVidu.createSession(sessionProperties);
        } catch (OpenViduException e){
            throw new SessionPropertiesInvalidException();
        }
    }

    public Session sendEnterSessionRequest(String name){
        try{
            openVidu.fetch();
            return openVidu.getActiveSession(name);
        } catch (OpenViduException e){
            throw new SessionNotExistException();
        }
    }

    public SessionProperties getSessionProperties(String name){
        HashMap<String,String> property = new HashMap<>();
        property.put("customSessionId",name);
        property.put("forcedVideoCodec",CODEC);
        System.out.println("property: "+property);
        return SessionProperties.fromJson(property).build();
    }
}
