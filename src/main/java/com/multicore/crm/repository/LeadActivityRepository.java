package com.multicore.crm.repository;

import com.multicore.crm.entity.LeadActivity;
import com.multicore.crm.entity.Lead;
import com.multicore.crm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeadActivityRepository extends JpaRepository<LeadActivity, Long> {
    List<LeadActivity> findByLead(Lead lead);
    List<LeadActivity> findByCreatedBy(User user);
}
