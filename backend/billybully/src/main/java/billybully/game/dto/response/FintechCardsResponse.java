package billybully.game.dto.response;

import billybully.game.domain.Fintech;

import java.util.List;

public record FintechCardsResponse(
        List<FintechResponse> cardList
) {
    public static FintechCardsResponse from(List<Fintech> fintechList) {
        return new FintechCardsResponse(fintechList.stream()
                .map(FintechResponse::from)
                .toList());
    }
}
