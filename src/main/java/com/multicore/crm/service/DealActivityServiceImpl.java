package com.multicore.crm.service;

import com.multicore.crm.dto.CreateDealActivityRequest;
import com.multicore.crm.dto.DealActivityDTO;
import com.multicore.crm.entity.DealActivity;
import com.multicore.crm.repository.DealActivityRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealActivityServiceImpl implements DealActivityService {

    private final DealActivityRepository repo;

    @Override
    public DealActivityDTO addActivity(Long businessId, CreateDealActivityRequest request) {
        DealActivity activity = new DealActivity();
        activity.setBusinessId(businessId);
        activity.setDealId(request.getDealId());
        activity.setType(request.getType());
        activity.setNote(request.getNote());
        activity.setUserId(request.getUserId());
        repo.save(activity);
        return toDTO(activity);
    }

    @Override
    public List<DealActivityDTO> getActivities(Long businessId, Long dealId) {
        return repo.findByBusinessIdAndDealId(businessId, dealId)
                .stream().map(this::toDTO).toList();
    }

    private DealActivityDTO toDTO(DealActivity a) {
        DealActivityDTO dto = new DealActivityDTO();
        dto.setId(a.getId());
        dto.setBusinessId(a.getBusinessId());
        dto.setDealId(a.getDealId());
        dto.setType(a.getType());
        dto.setNote(a.getNote());
        dto.setUserId(a.getUserId());
        dto.setCreatedAt(a.getCreatedAt());
        return dto;
    }
}
