package billybully.game.dto.response;

import billybully.game.domain.Situation;
import lombok.Getter;

import java.util.List;

public record StartGameResponses(
        List<StartGameResponse> situations
){
    public static StartGameResponses of(List<Situation> situationList) {
        List<StartGameResponse> startGameResponses = situationList.stream()
                .map(StartGameResponse::from)
                .toList();
        return new StartGameResponses(startGameResponses);
    }

    @Getter
    public static class StartGameResponse {
        private Integer id;
        private String name;
        private String story;

        public StartGameResponse(Integer id, String name, String story) {
            this.id = id;
            this.name = name;
            this.story = story;
        }

        public static StartGameResponse from(Situation situation) {
            return new StartGameResponse(situation.getId(), situation.getName(), situation.getStory());
        }

    }

}
