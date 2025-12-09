package com.multicore.crm.service;

import com.multicore.crm.dto.CreateFollowUpTaskRequest;
import com.multicore.crm.dto.FollowUpTaskDTO;
import com.multicore.crm.entity.FollowUpTask;
import com.multicore.crm.repository.FollowUpTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowUpTaskServiceImpl implements FollowUpTaskService {

    private final FollowUpTaskRepository taskRepository;

    @Override
    public FollowUpTaskDTO createTask(Long businessId, CreateFollowUpTaskRequest request) {
        FollowUpTask task = new FollowUpTask();
        task.setBusinessId(businessId);
        task.setUserId(request.getUserId());
        task.setCustomerId(request.getCustomerId());
        task.setLeadId(request.getLeadId());
        task.setDealId(request.getDealId());
        task.setTitle(request.getTitle());
        task.setDueDate(request.getDueDate());
        taskRepository.save(task);
        return toDTO(task);
    }

    @Override
    public FollowUpTaskDTO updateTask(Long businessId, Long taskId, CreateFollowUpTaskRequest request) {
        FollowUpTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getBusinessId().equals(businessId))
            throw new RuntimeException("Unauthorized");

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());

        taskRepository.save(task);
        return toDTO(task);
    }

    @Override
    public List<FollowUpTaskDTO> getTasks(Long businessId, Long userId) {
        return taskRepository.findByBusinessIdAndUserId(businessId, userId)
                .stream().map(this::toDTO).toList();
    }

    @Override
    public void markTaskDone(Long businessId, Long taskId) {
        FollowUpTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getBusinessId().equals(businessId))
            throw new RuntimeException("Unauthorized");

        task.setStatus(FollowUpTask.Status.DONE);
        taskRepository.save(task);
    }

    private FollowUpTaskDTO toDTO(FollowUpTask task) {
        FollowUpTaskDTO dto = new FollowUpTaskDTO();
        dto.setId(task.getId());
        dto.setBusinessId(task.getBusinessId());
        dto.setUserId(task.getUserId());
        dto.setCustomerId(task.getCustomerId());
        dto.setLeadId(task.getLeadId());
        dto.setDealId(task.getDealId());
        dto.setTitle(task.getTitle());
        dto.setDueDate(task.getDueDate());
        dto.setStatus(task.getStatus());
        dto.setCreatedAt(task.getCreatedAt());
        return dto;
    }
}
