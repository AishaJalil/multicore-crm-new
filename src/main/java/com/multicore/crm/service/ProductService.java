package com.multicore.crm.service;

import com.multicore.crm.dto.*;

import java.util.List;

public interface ProductService {
    ProductDTO create(Long businessId, CreateProductRequest request);
    List<ProductDTO> getAll(Long businessId);
    ProductDTO get(Long businessId, Long productId);
    ProductDTO update(Long businessId, Long productId, UpdateProductRequest request);
    void delete(Long businessId, Long productId);
}
