package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "follow_up_tasks")
@Data
public class FollowUpTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    @Column(nullable = false)
    private Long userId; // or @ManyToOne User

    private Long customerId; // or @ManyToOne Customer
    private Long leadId;     // or @ManyToOne Lead
    private Long dealId;     // or @ManyToOne Deal

    @Column(nullable = false)
    private String title;

    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    private LocalDateTime createdAt;

    public enum Status { PENDING, DONE }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
