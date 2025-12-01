package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private RoleType roleName;

    @Column(nullable = true)
    private String description;

    public enum RoleType {
        ADMIN,      // System-level, manages all tenants
        OWNER,      // Owns exactly one business (tenant)
        STAFF,      // Works in one business
        CUSTOMER    // Can belong to many businesses via CustomerBusinessMatch
    }
}