package br.com.example.goldenraspberry.service;

import br.com.example.goldenraspberry.dto.AwardIntervalResponseDTO;
import br.com.example.goldenraspberry.dto.ProducerIntervalDTO;
import br.com.example.goldenraspberry.entity.Movie;
import br.com.example.goldenraspberry.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class AwardService {

    private static final Pattern PRODUCER_SEPARATOR =
            Pattern.compile("\\s*,\\s*(?:and\\s+)?|\\s+and\\s+", Pattern.CASE_INSENSITIVE);

    private final MovieRepository movieRepository;

    public AwardService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public AwardIntervalResponseDTO findAwardIntervals() {
        Map<String, Integer> lastWinByProducer = new HashMap<>();

        List<ProducerIntervalDTO> min = new ArrayList<>();
        List<ProducerIntervalDTO> max = new ArrayList<>();

        int minInterval = Integer.MAX_VALUE;
        int maxInterval = Integer.MIN_VALUE;

        List<Movie> winnerMovies = movieRepository.findByWinnerTrueOrderByYearAsc();

        for (Movie movie : winnerMovies) {
            int currentYear = movie.getYear();

            for (String producer : splitProducers(movie.getProducers())) {

                Integer previousWin = lastWinByProducer.get(producer);

                if (previousWin != null && !previousWin.equals(currentYear)) {

                    int interval = currentYear - previousWin;

                    ProducerIntervalDTO intervalDTO = new ProducerIntervalDTO(
                            producer,
                            interval,
                            previousWin,
                            currentYear
                    );

                    if (interval < minInterval) {
                        minInterval = interval;
                        min.clear();
                        min.add(intervalDTO);

                    } else if (interval == minInterval) {
                        min.add(intervalDTO);
                    }

                    if (interval > maxInterval) {
                        maxInterval = interval;
                        max.clear();
                        max.add(intervalDTO);

                    } else if (interval == maxInterval) {
                        max.add(intervalDTO);
                    }
                }

                lastWinByProducer.put(producer, currentYear);
            }
        }

        min.sort(comparator());
        max.sort(comparator());

        return new AwardIntervalResponseDTO(min, max);
    }

    private List<String> splitProducers(String producers) {
        if (producers == null || producers.isBlank()) {
            return List.of();
        }

        return PRODUCER_SEPARATOR.splitAsStream(producers)
                .map(String::trim)
                .filter(producer -> !producer.isBlank())
                .toList();
    }

    private Comparator<ProducerIntervalDTO> comparator() {
        return Comparator
                .comparing(ProducerIntervalDTO::producer)
                .thenComparing(ProducerIntervalDTO::previousWin)
                .thenComparing(ProducerIntervalDTO::followingWin);
    }
}
