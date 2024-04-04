package billybully.game.dto.response;

import billybully.game.domain.Fintech;
import billybully.room.domain.Player;

import java.util.List;

public record PropertiesResponse(
//        long memberId,
//        Integer cash,
//        Integer loan,
//        List<FintechResponse> fintechResponses,
        PersonalPropertyResponse myProperty,
        List<OtherPropertiesResponse> propertyList
) {
    public static PropertiesResponse of(PersonalPropertyResponse myProperty, List<OtherPropertiesResponse> otherPropertiesResponses) {
        return new PropertiesResponse(
                myProperty,
                otherPropertiesResponses
        );
    }
}
