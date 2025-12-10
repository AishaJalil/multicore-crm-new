package com.multicore.crm.service;

import com.multicore.crm.dto.*;
import java.util.List;

public interface AppointmentService {

    AppointmentDTO create(AppointmentCreateDTO dto);

    AppointmentDTO update(Long id, AppointmentUpdateDTO dto);

    AppointmentDTO updateStatus(Long id, AppointmentStatusUpdateDTO dto);

    AppointmentDTO getById(Long id);

    List<AppointmentDTO> getByBusiness(Long businessId);

    List<AppointmentDTO> getByUser(Long userId);

    List<AppointmentDTO> getByCustomer(Long customerId);

    List<AppointmentDTO> getAppointmentsForDate(Long businessId, String date); // calendar view
}
