package com.multicore.crm.dto;

import com.multicore.crm.entity.LeadActivity;
import lombok.Data;

import jakarta.validation.constraints.NotNull;

@Data
public class CreateDealActivityRequest {

    @NotNull
    private Long dealId;

    @NotNull
    private LeadActivity.ActivityType type;

    private String note;

    @NotNull
    private Long userId;
}
