package br.com.example.goldenraspberry.dto;

public record ProducerIntervalDTO(
        String producer,
        Integer interval,
        Integer previousWin,
        Integer followingWin
) {}
