package com.multicore.crm.repository;

import com.multicore.crm.entity.DealActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealActivityRepository extends JpaRepository<DealActivity, Long> {
    List<DealActivity> findByBusinessIdAndDealId(Long businessId, Long dealId);
}
