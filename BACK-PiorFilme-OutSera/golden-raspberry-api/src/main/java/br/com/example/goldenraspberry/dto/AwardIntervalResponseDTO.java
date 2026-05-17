package br.com.example.goldenraspberry.dto;

import java.util.List;

public record AwardIntervalResponseDTO(
        List<ProducerIntervalDTO> min,
        List<ProducerIntervalDTO> max
) {}
