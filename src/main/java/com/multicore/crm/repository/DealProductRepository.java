package com.multicore.crm.repository;

import com.multicore.crm.entity.DealProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DealProductRepository extends JpaRepository<DealProduct, Long> {
    List<DealProduct> findByDealId(Long dealId);
}
