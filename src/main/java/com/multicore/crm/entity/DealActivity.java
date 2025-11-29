package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "deal_activities")
@Data
public class DealActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    @Column(nullable = false)
    private Long dealId; // or @ManyToOne Deal

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadActivity.ActivityType type;

    private String note;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private Long userId; // or @ManyToOne User

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
