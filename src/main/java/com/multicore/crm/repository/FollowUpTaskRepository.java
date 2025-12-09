package com.multicore.crm.repository;

import com.multicore.crm.entity.FollowUpTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowUpTaskRepository extends JpaRepository<FollowUpTask, Long> {
    List<FollowUpTask> findByBusinessIdAndUserId(Long businessId, Long userId);
    List<FollowUpTask> findByDealId(Long dealId);
}
