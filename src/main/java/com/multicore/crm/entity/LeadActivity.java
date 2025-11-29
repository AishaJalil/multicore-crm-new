package com.multicore.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "lead_activities")
@Data
public class LeadActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    @Column(nullable = false)
    private Long leadId; // or @ManyToOne Lead

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    private String note;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private Long userId; // or @ManyToOne User

    public enum ActivityType { CALL, EMAIL, MEETING, NOTE }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
