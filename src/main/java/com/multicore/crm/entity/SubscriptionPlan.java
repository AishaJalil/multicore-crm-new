package com.multicore.crm.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;


@Entity
@Table(name = "subscription_plans")
@Data
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @DecimalMin("0.0")
    private Double price;

    private Integer maxStaff;
    private Integer maxTicketsPerMonth;
    private Integer maxCustomers;
    private Boolean analyticsAccess = false;
}

