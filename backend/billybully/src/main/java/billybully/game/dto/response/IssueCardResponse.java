package billybully.game.dto.response;

import billybully.game.domain.Issue;

public record IssueCardResponse(
        Integer issueId,
        String name,
        String description
) {
    public static IssueCardResponse from(Issue issue) {
        return new IssueCardResponse(issue.getId(), issue.getName(), issue.getDescription());
    }
}
