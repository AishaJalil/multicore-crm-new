package com.multicore.crm.dto;

import lombok.Data;

@Data
public class DealProductRequestDTO {
    private Long dealId;
    private Long productId;
    private Integer quantity;
}
