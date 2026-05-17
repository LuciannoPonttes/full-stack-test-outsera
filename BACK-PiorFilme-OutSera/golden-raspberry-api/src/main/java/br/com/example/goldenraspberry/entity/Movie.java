package br.com.example.goldenraspberry.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "movie_year", nullable = false)
    private Integer year;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(length = 500)
    private String studios;

    @Column(length = 1000)
    private String producers;

    @Column(nullable = false)
    private Boolean winner;

    public Movie() {}

    public Movie(Integer year, String title, String studios, String producers, Boolean winner) {
        this.year = year;
        this.title = title;
        this.studios = studios;
        this.producers = producers;
        this.winner = winner;
    }

    public Long getId() { return id; }
    public Integer getYear() { return year; }
    public String getTitle() { return title; }
    public String getStudios() { return studios; }
    public String getProducers() { return producers; }
    public Boolean getWinner() { return winner; }
}
