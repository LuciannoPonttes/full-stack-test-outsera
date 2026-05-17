package br.com.example.goldenraspberry.controller;

import br.com.example.goldenraspberry.dto.AwardIntervalResponseDTO;
import br.com.example.goldenraspberry.service.AwardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/awards")
public class AwardController {

    private final AwardService awardService;

    public AwardController(AwardService awardService) {
        this.awardService = awardService;
    }

    @GetMapping("/intervals")
    public ResponseEntity<AwardIntervalResponseDTO> getIntervals() {
        return ResponseEntity.ok(awardService.findAwardIntervals());
    }
}
