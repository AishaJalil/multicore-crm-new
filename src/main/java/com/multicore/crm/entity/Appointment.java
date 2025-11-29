package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    @Column(nullable = false)
    private Long userId; // or @ManyToOne User

    @Column(nullable = false)
    private Long customerId; // or @ManyToOne Customer

    private LocalDate date;
    private LocalTime time;
    private String location;
    private String note;

    @Enumerated(EnumType.STRING)
    private Status status = Status.SCHEDULED;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum Status { SCHEDULED, CANCELLED, COMPLETED }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
