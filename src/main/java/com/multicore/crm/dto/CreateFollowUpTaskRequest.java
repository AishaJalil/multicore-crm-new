package com.multicore.crm.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateFollowUpTaskRequest {
    private Long userId;
    private Long customerId;
    private Long leadId;
    private Long dealId;
    private String title;
    private LocalDateTime dueDate;
}
