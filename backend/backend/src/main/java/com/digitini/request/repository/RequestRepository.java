package com.digitini.request.repository;

import com.digitini.request.Request;
import com.digitini.model.enums.RequestStatus;
import com.digitini.model.enums.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long userId);
    List<Request> findByStatus(RequestStatus status);
    List<Request> findByServiceType(ServiceType serviceType);
    Optional<Request> findByTrackingNumber(String trackingNumber);
}