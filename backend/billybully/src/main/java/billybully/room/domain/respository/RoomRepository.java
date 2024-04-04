package billybully.room.domain.respository;

import billybully.game.exception.RoomNotFoundException;
import billybully.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    default Room getById(Long id) {
        return findById(id)
                .orElseThrow(RoomNotFoundException::new);
    }

    default List<Room> getAll(){
        return findAll().stream().toList();
    }
}
