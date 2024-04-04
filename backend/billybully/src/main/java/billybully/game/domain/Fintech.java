package billybully.game.domain;

import billybully.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "fintech")
public class Fintech {

    @Id
    private Integer id;
    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String name;

    @Column(name = "buy_price", nullable = false)
    private Integer buyPrice;
    @Column(name = "sell_price", nullable = false)
    private Integer sellPrice;
    @Column(nullable = false)
    private Integer income;

    public void applySituationEffect(double effect) {
        this.buyPrice = (int) (this.buyPrice * effect);
        this.sellPrice = (int) (this.sellPrice * effect);
        this.income = (int) (this.income * effect);
    }
}
