package com.multicore.crm.dto;

import com.multicore.crm.entity.FollowUpTask.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FollowUpTaskDTO {
    private Long id;
    private Long businessId;
    private Long userId;
    private Long customerId;
    private Long leadId;
    private Long dealId;
    private String title;
    private LocalDateTime dueDate;
    private Status status;
    private LocalDateTime createdAt;
}
