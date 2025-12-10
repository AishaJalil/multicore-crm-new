package com.multicore.crm.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentUpdateDTO {
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String note;
}
