package com.multicore.crm.controller;

import com.multicore.crm.dto.*;
import com.multicore.crm.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business/{businessId}/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ProductDTO create(
            @PathVariable Long businessId,
            @RequestBody CreateProductRequest req) {
        return service.create(businessId, req);
    }

    @GetMapping
    public List<ProductDTO> getAll(@PathVariable Long businessId) {
        return service.getAll(businessId);
    }

    @GetMapping("/{id}")
    public ProductDTO get(
            @PathVariable Long businessId,
            @PathVariable Long id) {
        return service.get(businessId, id);
    }

    @PutMapping("/{id}")
    public ProductDTO update(
            @PathVariable Long businessId,
            @PathVariable Long id,
            @RequestBody UpdateProductRequest req) {
        return service.update(businessId, id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long businessId,
            @PathVariable Long id) {
        service.delete(businessId, id);
    }
}
