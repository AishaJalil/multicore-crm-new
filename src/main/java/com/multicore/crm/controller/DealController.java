package com.multicore.crm.controller;

import com.multicore.crm.dto.CreateDealRequest;
import com.multicore.crm.dto.DealDTO;
import com.multicore.crm.dto.UpdateDealRequest;
import com.multicore.crm.service.DealService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business/{businessId}/deals")
@RequiredArgsConstructor
public class DealController {

    private final DealService dealService;

    @PostMapping
    public DealDTO createDeal(
            @PathVariable Long businessId,
            @RequestBody CreateDealRequest request) {
        return dealService.createDeal(businessId, request);
    }

    @GetMapping
    public List<DealDTO> getDeals(@PathVariable Long businessId) {
        return dealService.getDeals(businessId);
    }

    @GetMapping("/{dealId}")
    public DealDTO getDeal(
            @PathVariable Long businessId,
            @PathVariable Long dealId) {
        return dealService.getDeal(businessId, dealId);
    }

    @PutMapping("/{dealId}")
    public DealDTO updateDeal(
            @PathVariable Long businessId,
            @PathVariable Long dealId,
            @RequestBody UpdateDealRequest request) {
        return dealService.updateDeal(businessId, dealId, request);
    }

    @DeleteMapping("/{dealId}")
    public void deleteDeal(
            @PathVariable Long businessId,
            @PathVariable Long dealId) {
        dealService.deleteDeal(businessId, dealId);
    }
}
