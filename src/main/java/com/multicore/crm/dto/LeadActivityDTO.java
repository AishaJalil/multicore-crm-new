package com.multicore.crm.dto;

import com.multicore.crm.entity.LeadActivity.ActivityType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LeadActivityDTO {
    private Long id;
    private Long leadId;
    private ActivityType activityType;
    private String description;
    private Integer scorePoints;
    private Long createdById;
    private LocalDateTime createdAt;
}
