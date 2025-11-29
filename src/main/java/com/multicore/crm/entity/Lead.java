package com.multicore.crm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Data
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long businessId;

    private Long customerId; // optional link, or use @ManyToOne Customer

    @Column(nullable = false)
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "\\+?[0-9]{7,15}")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadStatus status = LeadStatus.NEW;

    @Min(0)
    @Max(100)
    private Integer score = 0;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum LeadStatus { NEW, QUALIFIED, WON, LOST }

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
