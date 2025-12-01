package com.digitini.request.service;

import com.digitini.request.dto.CreateRequestRequest;
import com.digitini.request.dto.RequestDto;
import com.digitini.request.dto.UpdateRequestStatusRequest;
import com.digitini.model.enums.RequestStatus;

import java.util.List;

public interface RequestService {
    RequestDto createRequest(Long userId, CreateRequestRequest request);
    RequestDto getRequestById(Long id);
    List<RequestDto> getUserRequests(Long userId);
    List<RequestDto> getAllRequests();
    RequestDto updateRequestStatus(Long requestId, UpdateRequestStatusRequest request, Long changedByUserId);
    RequestDto getRequestByTrackingNumber(String trackingNumber);
}