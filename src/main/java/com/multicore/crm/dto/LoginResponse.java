package com.multicore.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private Long userId;
    private String email;
    private String fullName;
    private Long businessId;
    private String role;
    private String message;
    private Boolean success;
}