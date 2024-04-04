package billybully.room.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@RequiredArgsConstructor
@ToString
public class Room {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password")
    private Integer password;

    @Column(name = "masterId", nullable = false)
    private Long masterId;

    @Column(name = "game_started")
    private Boolean gameStarted;

    @Column(name = "participants")
    private int players;

    public Room(String name, Integer password, Long masterId) {
        this.name = name;
        this.password = password;
        this.masterId = masterId;
        this.gameStarted = false;
        this.players = 1;
    }

    public boolean getGameStatus(boolean gameStarted) {
        return this.gameStarted;
    }

    public void updatePlayers(int players){
        this.players = players;
    }

    public void changeStatus(boolean status) {
        this.gameStarted = status;
    }
}
