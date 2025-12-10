package com.multicore.crm.dto;

import lombok.Data;

@Data
public class DealProductResponseDTO {
    private Long id;
    private Long dealId;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double lineTotal;
}
