package br.com.example.goldenraspberry.repository;

import br.com.example.goldenraspberry.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByWinnerTrueOrderByYearAsc();
}
