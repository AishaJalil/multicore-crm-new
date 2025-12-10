package com.multicore.crm.service;

import com.multicore.crm.dto.*;
import com.multicore.crm.entity.Product;
import com.multicore.crm.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    @Override
    public ProductDTO create(Long businessId, CreateProductRequest req) {
        Product product = new Product();
        product.setBusinessId(businessId);
        product.setName(req.getName());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        return toDTO(repo.save(product));
    }

    @Override
    public List<ProductDTO> getAll(Long businessId) {
        return repo.findByBusinessId(businessId)
                .stream().map(this::toDTO).toList();
    }

    @Override
    public ProductDTO get(Long businessId, Long id) {
        Product p = repo.findById(id)
                .filter(x -> x.getBusinessId().equals(businessId))
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return toDTO(p);
    }

    @Override
    public ProductDTO update(Long businessId, Long productId, UpdateProductRequest req) {
        Product p = repo.findById(productId)
                .filter(x -> x.getBusinessId().equals(businessId))
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        return toDTO(repo.save(p));
    }

    @Override
    public void delete(Long businessId, Long productId) {
        Product p = repo.findById(productId)
                .filter(x -> x.getBusinessId().equals(businessId))
                .orElseThrow(() -> new RuntimeException("Product not found"));
        repo.delete(p);
    }

    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setBusinessId(p.getBusinessId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        return dto;
    }
}
