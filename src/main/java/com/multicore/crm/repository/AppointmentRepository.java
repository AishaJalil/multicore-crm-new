package com.multicore.crm.repository;

import com.multicore.crm.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByBusinessId(Long businessId);

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByCustomerId(Long customerId);

    List<Appointment> findByBusinessIdAndDate(Long businessId, LocalDate date);

    List<Appointment> findByUserIdAndDate(Long userId, LocalDate date);

    List<Appointment> findByCustomerIdAndStatus(Long customerId, Appointment.Status status);
}
