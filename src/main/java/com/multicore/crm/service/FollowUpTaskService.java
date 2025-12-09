package com.multicore.crm.service;

import com.multicore.crm.dto.FollowUpTaskDTO;
import com.multicore.crm.dto.CreateFollowUpTaskRequest;

import java.util.List;

public interface FollowUpTaskService {
    FollowUpTaskDTO createTask(Long businessId, CreateFollowUpTaskRequest request);
    FollowUpTaskDTO updateTask(Long businessId, Long taskId, CreateFollowUpTaskRequest request);
    List<FollowUpTaskDTO> getTasks(Long businessId, Long userId);
    void markTaskDone(Long businessId, Long taskId);
}
