package billybully.room.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@RequiredArgsConstructor
public class Player {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "position")
    private int position;

    @Column(name = "cash", nullable = false)
    private int cash;

    @Column(name = "loan", nullable = false)
    private int loan;

    public Player(Long roomId, Long memberId) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.cash = 500000000;
    }

    public void updateCash(int updatedCash) {
        this.cash = updatedCash;
    }

    public void moveTo(Integer destination) {
        this.position = destination;
    }

    public void loanMoney(Integer amount) {
        this.loan += amount;
        this.cash += amount;
    }

    public void repayLoan(Integer amount) {
        this.loan -= amount;
        this.cash -= amount;
    }

    public void initMoney() {
        this.loan = 0;
        this.cash = 500000000;
    }
}
