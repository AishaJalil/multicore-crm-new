package com.multicore.crm.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private Long businessId;
    private String name;
    private String description;
    private Double price;
}
