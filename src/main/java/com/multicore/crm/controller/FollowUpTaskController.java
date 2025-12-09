package com.multicore.crm.controller;

import com.multicore.crm.dto.CreateFollowUpTaskRequest;
import com.multicore.crm.dto.FollowUpTaskDTO;
import com.multicore.crm.service.FollowUpTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business/{businessId}/tasks")
@RequiredArgsConstructor
public class FollowUpTaskController {

    private final FollowUpTaskService taskService;

    @PostMapping
    public FollowUpTaskDTO createTask(@PathVariable Long businessId,
                                      @RequestBody CreateFollowUpTaskRequest request) {
        return taskService.createTask(businessId, request);
    }

    @GetMapping("/user/{userId}")
    public List<FollowUpTaskDTO> getTasks(@PathVariable Long businessId,
                                          @PathVariable Long userId) {
        return taskService.getTasks(businessId, userId);
    }

    @PutMapping("/{taskId}")
    public FollowUpTaskDTO updateTask(@PathVariable Long businessId,
                                      @PathVariable Long taskId,
                                      @RequestBody CreateFollowUpTaskRequest request) {
        return taskService.updateTask(businessId, taskId, request);
    }

    @PutMapping("/{taskId}/done")
    public void markDone(@PathVariable Long businessId,
                         @PathVariable Long taskId) {
        taskService.markTaskDone(businessId, taskId);
    }
}
