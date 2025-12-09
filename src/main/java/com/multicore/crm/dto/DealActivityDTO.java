package com.multicore.crm.dto;

import com.multicore.crm.entity.LeadActivity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DealActivityDTO {
    private Long id;
    private Long businessId;
    private Long dealId;
    private LeadActivity.ActivityType type;
    private String note;
    private Long userId;
    private LocalDateTime createdAt;
}
