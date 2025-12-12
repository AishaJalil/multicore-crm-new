package com.multicore.crm.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessDTO {
    private Long id;
    private String name;
    private String description;
    private String industry;
    private boolean active;

    // Owner summary
    private Long ownerId;
    private String ownerFullName;
    private String ownerEmail;
}
