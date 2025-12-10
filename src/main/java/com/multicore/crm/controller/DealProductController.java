package com.multicore.crm.controller;

import com.multicore.crm.dto.DealProductRequestDTO;
import com.multicore.crm.dto.DealProductResponseDTO;
import com.multicore.crm.service.DealProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals/products")
@RequiredArgsConstructor
public class DealProductController {

    private final DealProductService service;

    @PostMapping("/add")
    public DealProductResponseDTO addProduct(@RequestBody DealProductRequestDTO dto) {
        return service.addProductToDeal(dto);
    }

    @GetMapping("/deal/{dealId}")
    public List<DealProductResponseDTO> getProducts(@PathVariable Long dealId) {
        return service.getProductsByDeal(dealId);
    }
}
