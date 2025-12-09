package com.multicore.crm.dto;

import com.multicore.crm.entity.Deal.Stage;
import lombok.Data;

@Data
public class UpdateDealRequest {
    private String title;
    private Double amount;
    private Stage stage;
    private Integer probability;
    private String expectedCloseDate; // parse into LocalDate in service
}
