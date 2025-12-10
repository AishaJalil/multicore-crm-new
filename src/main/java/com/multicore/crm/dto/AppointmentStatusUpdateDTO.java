package com.multicore.crm.dto;

import com.multicore.crm.entity.Appointment;
import lombok.Data;

@Data
public class AppointmentStatusUpdateDTO {
    private Appointment.Status status;
}
