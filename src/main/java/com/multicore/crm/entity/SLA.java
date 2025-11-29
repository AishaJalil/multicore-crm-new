package com.multicore.crm.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "slas")
@Data
public class SLA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriorityLevel priorityLevel;

    @Column(nullable = false)
    private Integer allowedHours;

    public enum PriorityLevel { LOW, MEDIUM, HIGH, URGENT }
}
