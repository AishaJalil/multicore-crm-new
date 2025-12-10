package com.multicore.crm.controller;

import com.multicore.crm.dto.LeadActivityDTO;
import com.multicore.crm.entity.LeadActivity;
import com.multicore.crm.service.LeadActivityService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leads/activities")
public class LeadActivityController {

    private final LeadActivityService service;

    public LeadActivityController(LeadActivityService service) {
        this.service = service;
    }

    @PostMapping
    public LeadActivityDTO createActivity(@RequestBody LeadActivityDTO dto) {
        LeadActivity activity = service.createActivity(
                dto.getLeadId(),
                dto.getCreatedById(),
                dto.getActivityType(),
                dto.getDescription(),
                dto.getScorePoints() != null ? dto.getScorePoints() : 0
        );

        dto.setId(activity.getId());
        dto.setCreatedAt(activity.getCreatedAt());
        return dto;
    }

    @GetMapping("/lead/{leadId}")
    public List<LeadActivityDTO> getByLead(@PathVariable Long leadId) {
        return service.getActivitiesByLead(leadId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{userId}")
    public List<LeadActivityDTO> getByUser(@PathVariable Long userId) {
        return service.getActivitiesByUser(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private LeadActivityDTO toDTO(LeadActivity activity) {
        LeadActivityDTO dto = new LeadActivityDTO();
        dto.setId(activity.getId());
        dto.setLeadId(activity.getLead().getId());
        dto.setActivityType(activity.getActivityType());
        dto.setDescription(activity.getDescription());
        dto.setScorePoints(activity.getScorePoints());
        dto.setCreatedById(activity.getCreatedBy() != null ? activity.getCreatedBy().getId() : null);
        dto.setCreatedAt(activity.getCreatedAt());
        return dto;
    }
}
