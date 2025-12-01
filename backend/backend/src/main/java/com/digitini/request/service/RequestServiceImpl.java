package com.digitini.request.service;

import com.digitini.request.*;
import com.digitini.request.dto.CreateRequestRequest;
import com.digitini.request.dto.RequestDto;
import com.digitini.request.dto.UpdateRequestStatusRequest;
import com.digitini.request.mapper.RequestMapper;
import com.digitini.request.repository.RequestHistoryRepository;
import com.digitini.request.repository.RequestRepository;
import com.digitini.model.enums.RequestStatus;
import com.digitini.user.User;
import com.digitini.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestHistoryRepository requestHistoryRepository;
    private final UserRepository userRepository;
    private final RequestMapper requestMapper;

    @Override
    @Transactional
    public RequestDto createRequest(Long userId, CreateRequestRequest requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request request = Request.builder()
                .user(user)
                .serviceType(requestDto.getServiceType())
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .trackingNumber(generateTrackingNumber())
                .build();

        Request savedRequest = requestRepository.save(request);
        log.info("Created request with tracking number: {}", savedRequest.getTrackingNumber());
        
        return requestMapper.toDto(savedRequest);
    }

    @Override
    public RequestDto getRequestById(Long id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return requestMapper.toDto(request);
    }

    @Override
    public List<RequestDto> getUserRequests(Long userId) {
        return requestRepository.findByUserId(userId)
                .stream()
                .map(requestMapper::toDto)
                .toList();
    }

    @Override
    public List<RequestDto> getAllRequests() {
        return requestRepository.findAll()
                .stream()
                .map(requestMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public RequestDto updateRequestStatus(Long requestId, UpdateRequestStatusRequest updateRequest, Long changedByUserId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        
        User changedBy = userRepository.findById(changedByUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequestStatus oldStatus = request.getStatus();
        RequestStatus newStatus = updateRequest.getStatus();

        // Create history record
        RequestHistory history = RequestHistory.builder()
                .request(request)
                .fromStatus(oldStatus)
                .toStatus(newStatus)
                .changedBy(changedBy)
                .notes(updateRequest.getNotes())
                .build();
        requestHistoryRepository.save(history);

        // Update request
        request.setStatus(newStatus);
        if (newStatus == RequestStatus.COMPLETED || newStatus == RequestStatus.REJECTED) {
            request.setResolvedAt(java.time.LocalDateTime.now());
        }

        Request updatedRequest = requestRepository.save(request);
        log.info("Updated request {} status from {} to {}", requestId, oldStatus, newStatus);
        
        return requestMapper.toDto(updatedRequest);
    }

    @Override
    public RequestDto getRequestByTrackingNumber(String trackingNumber) {
        Request request = requestRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return requestMapper.toDto(request);
    }

    private String generateTrackingNumber() {
        return "DIG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}