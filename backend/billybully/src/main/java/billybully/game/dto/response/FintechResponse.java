package billybully.game.dto.response;

import billybully.game.domain.Fintech;

public record FintechResponse(
        Integer fintechId,
        String type,
        String name,
        Integer buyPrice,
        Integer sellPrice,
        Integer income

) {
    public static FintechResponse from(Fintech fintech) {
        return new FintechResponse(
                fintech.getId(),
                fintech.getType(),
                fintech.getName(),
                fintech.getBuyPrice(),
                fintech.getSellPrice(),
                fintech.getIncome()
        );
    }
}
