package com.multicore.crm.service;

import com.multicore.crm.dto.CreateDealActivityRequest;
import com.multicore.crm.dto.DealActivityDTO;

import java.util.List;

public interface DealActivityService {
    DealActivityDTO addActivity(Long businessId, CreateDealActivityRequest request);
    List<DealActivityDTO> getActivities(Long businessId, Long dealId);
}
