package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "business_services")
@Data
public class BusinessService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    @Column(nullable = false)
    private String name;

    private String description;
}
