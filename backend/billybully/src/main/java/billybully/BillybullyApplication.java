package billybully;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        servers = {
                @Server(url = "https://j10a401.p.ssafy.io/api", description = "deploy Server URL"),
                @Server(url = "https://localhost:8080", description = "local Server URL"),
        }
)
@SpringBootApplication
public class BillybullyApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillybullyApplication.class, args);
    }
}