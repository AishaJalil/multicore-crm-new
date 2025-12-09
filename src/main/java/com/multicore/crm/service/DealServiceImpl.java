package com.multicore.crm.service;

import com.multicore.crm.dto.CreateDealRequest;
import com.multicore.crm.dto.DealDTO;
import com.multicore.crm.dto.UpdateDealRequest;
import com.multicore.crm.entity.Business;
import com.multicore.crm.entity.Deal;
import com.multicore.crm.repository.BusinessRepository;
import com.multicore.crm.repository.DealRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final BusinessRepository businessRepository;

    @Override
    public DealDTO createDeal(Long businessId, CreateDealRequest request) {

        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        Deal deal = new Deal();
        deal.setBusiness(business);
        deal.setCustomerId(request.getCustomerId());
        deal.setLeadId(request.getLeadId());
        deal.setTitle(request.getTitle());
        deal.setAmount(request.getAmount());
        deal.setStage(request.getStage());
        deal.setProbability(request.getProbability());

        if (request.getExpectedCloseDate() != null) {
            deal.setExpectedCloseDate(LocalDate.parse(request.getExpectedCloseDate()));
        }

        dealRepository.save(deal);
        return toDTO(deal);
    }

    @Override
    public DealDTO updateDeal(Long businessId, Long dealId, UpdateDealRequest request) {

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        if (!deal.getBusiness().getId().equals(businessId))
            throw new RuntimeException("Unauthorized");

        if (request.getTitle() != null) deal.setTitle(request.getTitle());
        if (request.getAmount() != null) deal.setAmount(request.getAmount());
        if (request.getStage() != null) deal.setStage(request.getStage());
        if (request.getProbability() != null) deal.setProbability(request.getProbability());

        if (request.getExpectedCloseDate() != null)
            deal.setExpectedCloseDate(LocalDate.parse(request.getExpectedCloseDate()));

        dealRepository.save(deal);
        return toDTO(deal);
    }

    @Override
    public List<DealDTO> getDeals(Long businessId) {
        return dealRepository.findByBusinessId(businessId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public DealDTO getDeal(Long businessId, Long dealId) {

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        if (!deal.getBusiness().getId().equals(businessId))
            throw new RuntimeException("Unauthorized");

        return toDTO(deal);
    }

    @Override
    public void deleteDeal(Long businessId, Long dealId) {

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        if (!deal.getBusiness().getId().equals(businessId))
            throw new RuntimeException("Unauthorized");

        dealRepository.delete(deal);
    }

    private DealDTO toDTO(Deal deal) {
        DealDTO dto = new DealDTO();
        dto.setId(deal.getId());
        dto.setBusinessId(deal.getBusiness().getId());
        dto.setCustomerId(deal.getCustomerId());
        dto.setLeadId(deal.getLeadId());
        dto.setTitle(deal.getTitle());
        dto.setAmount(deal.getAmount());
        dto.setStage(deal.getStage());
        dto.setProbability(deal.getProbability());
        dto.setExpectedCloseDate(deal.getExpectedCloseDate());
        dto.setCreatedAt(deal.getCreatedAt());
        dto.setUpdatedAt(deal.getUpdatedAt());
        return dto;
    }
}
