package billybully.game.dto.response;

import billybully.game.domain.Fintech;
import billybully.room.domain.Player;

import java.util.List;
import java.util.stream.Collectors;

public record OtherPropertiesResponse(
        long memberId,
        String memberName,
        String memberProfile,

        Integer cash,
        Integer loan,
        List<FintechResponse> finTechResponses
) {
    public static OtherPropertiesResponse of(Long memberId, String memberName, String memberProfile, Player player, List<Fintech> fintechs) {
        return new OtherPropertiesResponse(
                memberId,
                memberName,
                memberProfile,
                player.getCash(),
                player.getLoan(),
                fintechs.stream().map(FintechResponse::from).collect(Collectors.toList())
        );
    }
}
