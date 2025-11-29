package com.multicore.crm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;

@Entity
@Table(name = "customer_business_matches")
@Data
public class CustomerBusinessMatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long customerId; // or @ManyToOne Customer

    @Column(nullable = false)
    private Long businessId; // or @ManyToOne Business

    @Min(0) @Max(100)
    private Integer score;
}
