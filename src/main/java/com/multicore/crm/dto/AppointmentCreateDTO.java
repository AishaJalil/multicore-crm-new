package com.multicore.crm.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentCreateDTO {
    private Long businessId;
    private Long userId;
    private Long customerId;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String note;
}
