package br.com.example.goldenraspberry.config;

import br.com.example.goldenraspberry.entity.Movie;
import br.com.example.goldenraspberry.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Component
public class CsvMovieLoader implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final String fileName;

    public CsvMovieLoader(MovieRepository movieRepository,
                          @Value("${app.csv.file-name:movielist.csv}") String fileName) {
        this.movieRepository = movieRepository;
        this.fileName = fileName;
    }

    @Override
    public void run(String... args) throws Exception {
        if (movieRepository.count() > 0) return;

        ClassPathResource resource = new ClassPathResource(fileName);
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            reader.lines()
                    .skip(1)
                    .filter(line -> !line.isBlank())
                    .map(this::toMovie)
                    .forEach(movieRepository::save);
        }
    }

    private Movie toMovie(String line) {
        String[] columns = line.split(";", -1);
        if (columns.length < 5) {
            throw new IllegalArgumentException("Linha CSV inválida: " + line);
        }

        Integer year = Integer.valueOf(columns[0].trim());
        String title = columns[1].trim();
        String studios = columns[2].trim();
        String producers = columns[3].trim();
        Boolean winner = "yes".equalsIgnoreCase(columns[4].trim());

        return new Movie(year, title, studios, producers, winner);
    }
}
