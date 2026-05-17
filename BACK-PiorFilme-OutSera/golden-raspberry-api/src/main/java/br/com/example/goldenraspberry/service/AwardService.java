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

    private static final Pattern PRODUCER_SEPARATOR = Pattern.compile(",\\s*|\\s+and\\s+", Pattern.CASE_INSENSITIVE);

    private final MovieRepository movieRepository;

    public AwardService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public AwardIntervalResponseDTO findAwardIntervals() {
        Map<String, List<Integer>> winsByProducer = new HashMap<>();

        for (Movie movie : movieRepository.findByWinnerTrueOrderByYearAsc()) {
            for (String producer : splitProducers(movie.getProducers())) {
                winsByProducer.computeIfAbsent(producer, key -> new ArrayList<>()).add(movie.getYear());
            }
        }

        List<ProducerIntervalDTO> intervals = new ArrayList<>();

        winsByProducer.forEach((producer, years) -> {
            List<Integer> sortedYears = years.stream().distinct().sorted().toList();
            for (int i = 1; i < sortedYears.size(); i++) {
                int previousWin = sortedYears.get(i - 1);
                int followingWin = sortedYears.get(i);
                intervals.add(new ProducerIntervalDTO(
                        producer,
                        followingWin - previousWin,
                        previousWin,
                        followingWin
                ));
            }
        });

        if (intervals.isEmpty()) {
            return new AwardIntervalResponseDTO(List.of(), List.of());
        }

        int minInterval = intervals.stream().mapToInt(ProducerIntervalDTO::interval).min().orElse(0);
        int maxInterval = intervals.stream().mapToInt(ProducerIntervalDTO::interval).max().orElse(0);

        List<ProducerIntervalDTO> min = intervals.stream()
                .filter(item -> item.interval() == minInterval)
                .sorted(comparator())
                .toList();

        List<ProducerIntervalDTO> max = intervals.stream()
                .filter(item -> item.interval() == maxInterval)
                .sorted(comparator())
                .toList();

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
