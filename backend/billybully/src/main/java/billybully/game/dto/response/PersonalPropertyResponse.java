package billybully.game.dto.response;

import billybully.game.domain.Fintech;

import java.util.List;

public record PersonalPropertyResponse(
        Long memberId,
        String memberName,
        String memberProfile,
        Integer cash,
        Integer loan,
        List<FintechResponse> fintechList
) {
    public static PersonalPropertyResponse of(Long id, String memberName, String memberProfile, int cash, int loan, List<Fintech> fintechList) {
        return new PersonalPropertyResponse(
                id,
                memberName,
                memberProfile,
                cash,
                loan,
                fintechList.stream().map(FintechResponse::from).toList()
        );
    }
}
