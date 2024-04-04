package billybully.game.domain;

import billybully.member.domain.Member;
import billybully.room.domain.Player;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "fintech_possession")
public class FintechPossession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(nullable = false)
    private String type;

    @Column(name = "fintech_id", nullable = false)
    private Integer fintechId;

    public static FintechPossession of(Player player, String type, Integer fintechId) {
        return FintechPossession.builder()
                .player(player)
                .type(type)
                .fintechId(fintechId)
                .build();
    }
}
