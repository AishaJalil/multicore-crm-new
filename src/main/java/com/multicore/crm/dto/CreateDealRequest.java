package com.multicore.crm.dto;

import com.multicore.crm.entity.Deal.Stage;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class CreateDealRequest {

    @NotNull
    private Long customerId;

    private Long leadId;

    @NotBlank
    private String title;

    private Double amount;

    private Stage stage = Stage.PROSPECT;

    private Integer probability;

    // Add this field
    private String expectedCloseDate;  // ISO string format: "2025-01-10"
}
