package com.multicore.crm.service;

import com.multicore.crm.dto.DealProductRequestDTO;
import com.multicore.crm.dto.DealProductResponseDTO;
import com.multicore.crm.entity.Deal;
import com.multicore.crm.entity.DealProduct;
import com.multicore.crm.entity.Product;
import com.multicore.crm.repository.DealProductRepository;
import com.multicore.crm.repository.DealRepository;
import com.multicore.crm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealProductService {

    private final DealRepository dealRepository;
    private final ProductRepository productRepository;
    private final DealProductRepository dealProductRepository;

    public DealProductResponseDTO addProductToDeal(DealProductRequestDTO dto) {
        Deal deal = dealRepository.findById(dto.getDealId())
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        DealProduct dp = new DealProduct();
        dp.setDeal(deal);
        dp.setProduct(product);
        dp.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 1);

        dealProductRepository.save(dp);

        // update deal amount
        double total = dealProductRepository.findByDealId(deal.getId())
                .stream()
                .mapToDouble(DealProduct::getLineTotal)
                .sum();
        deal.setAmount(total);
        dealRepository.save(deal);

        return toDTO(dp);
    }

    public List<DealProductResponseDTO> getProductsByDeal(Long dealId) {
        return dealProductRepository.findByDealId(dealId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private DealProductResponseDTO toDTO(DealProduct dp) {
        DealProductResponseDTO dto = new DealProductResponseDTO();
        dto.setId(dp.getId());
        dto.setDealId(dp.getDeal().getId());
        dto.setProductId(dp.getProduct().getId());
        dto.setProductName(dp.getProduct().getName());
        dto.setQuantity(dp.getQuantity());
        dto.setLineTotal(dp.getLineTotal());
        return dto;
    }
}
