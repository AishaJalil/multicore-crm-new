package com.multicore.crm.service;

import com.multicore.crm.dto.CreateDealRequest;
import com.multicore.crm.dto.DealDTO;
import com.multicore.crm.dto.UpdateDealRequest;

import java.util.List;

public interface DealService {
    DealDTO createDeal(Long businessId, CreateDealRequest request);
    DealDTO updateDeal(Long businessId, Long dealId, UpdateDealRequest request);
    List<DealDTO> getDeals(Long businessId);
    DealDTO getDeal(Long businessId, Long dealId);
    void deleteDeal(Long businessId, Long dealId);
}
