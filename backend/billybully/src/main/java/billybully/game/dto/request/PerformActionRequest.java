package billybully.game.dto.request;

import jakarta.validation.constraints.NotNull;

public record PerformActionRequest(
        @NotNull(message = "Null 값이 올 수 없습니다. 올바른 값인지 확인해주세요")
        Integer destination,
        @NotNull(message = "Null 값이 올 수 없습니다. 올바른 값인지 확인해주세요")
        Boolean salary,
        @NotNull(message = "Null 값이 올 수 없습니다. 올바른 값인지 확인해주세요")
        Integer cardId
) {
}
