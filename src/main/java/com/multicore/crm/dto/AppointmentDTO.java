package com.multicore.crm.dto;

import com.multicore.crm.entity.Appointment;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    private Long id;
    private Long businessId;
    private Long userId;
    private Long customerId;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String note;
    private Appointment.Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
