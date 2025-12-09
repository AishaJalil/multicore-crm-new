package com.multicore.crm.controller;

import com.multicore.crm.dto.CreateDealActivityRequest;
import com.multicore.crm.dto.DealActivityDTO;
import com.multicore.crm.service.DealActivityService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business/{businessId}/deals/{dealId}/activities")
@RequiredArgsConstructor
public class DealActivityController {

    private final DealActivityService service;

    @PostMapping
    public DealActivityDTO createActivity(
            @PathVariable Long businessId,
            @PathVariable Long dealId,
            @RequestBody CreateDealActivityRequest request) {
        request.setDealId(dealId);
        return service.addActivity(businessId, request);
    }

    @GetMapping
    public List<DealActivityDTO> getAll(
            @PathVariable Long businessId,
            @PathVariable Long dealId) {
        return service.getActivities(businessId, dealId);
    }
}
