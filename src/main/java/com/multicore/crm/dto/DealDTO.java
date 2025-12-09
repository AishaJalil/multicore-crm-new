package com.multicore.crm.dto;

import com.multicore.crm.entity.Deal.Stage;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DealDTO {
    private Long id;
    private Long businessId;
    private Long customerId;
    private Long leadId;
    private String title;
    private Double amount;
    private Stage stage;
    private Integer probability;
    private LocalDate expectedCloseDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
