package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "deal_products")
@Data
public class DealProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id", nullable = false)
    private Deal deal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private Integer quantity = 1;

    private Double lineTotal;

    @PrePersist
    @PreUpdate
    public void calculateLineTotal() {
        if (product != null && quantity != null) {
            lineTotal = product.getPrice() * quantity;
        }
    }
}
