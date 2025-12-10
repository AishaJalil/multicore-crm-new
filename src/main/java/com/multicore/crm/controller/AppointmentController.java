package com.multicore.crm.controller;

import com.multicore.crm.dto.*;
import com.multicore.crm.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;

    @PostMapping
    public AppointmentDTO create(@RequestBody AppointmentCreateDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public AppointmentDTO update(@PathVariable Long id, @RequestBody AppointmentUpdateDTO dto) {
        return service.update(id, dto);
    }

    @PutMapping("/{id}/status")
    public AppointmentDTO updateStatus(@PathVariable Long id, @RequestBody AppointmentStatusUpdateDTO dto) {
        return service.updateStatus(id, dto);
    }

    @GetMapping("/{id}")
    public AppointmentDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/business/{businessId}")
    public List<AppointmentDTO> getByBusiness(@PathVariable Long businessId) {
        return service.getByBusiness(businessId);
    }

    @GetMapping("/user/{userId}")
    public List<AppointmentDTO> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    @GetMapping("/customer/{customerId}")
    public List<AppointmentDTO> getByCustomer(@PathVariable Long customerId) {
        return service.getByCustomer(customerId);
    }

    @GetMapping("/calendar/{businessId}/{date}")
    public List<AppointmentDTO> getAppointmentsForDate(
            @PathVariable Long businessId,
            @PathVariable String date
    ) {
        return service.getAppointmentsForDate(businessId, date);
    }
}
