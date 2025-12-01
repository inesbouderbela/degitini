package com.digitini.request.controller;

import com.digitini.request.dto.CreateRequestRequest;
import com.digitini.request.dto.RequestDto;
import com.digitini.request.dto.UpdateRequestStatusRequest;
import com.digitini.request.service.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/requests")
@RequiredArgsConstructor
public class RequestController {
    
    private final RequestService requestService;
    
    @PostMapping
    public ResponseEntity<RequestDto> createRequest(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody CreateRequestRequest request) {
        return ResponseEntity.ok(requestService.createRequest(userId, request));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RequestDto> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RequestDto>> getUserRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getUserRequests(userId));
    }
    
    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<RequestDto> getRequestByTracking(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(requestService.getRequestByTrackingNumber(trackingNumber));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<RequestDto> updateRequestStatus(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long changedByUserId,
            @Valid @RequestBody UpdateRequestStatusRequest request) {
        return ResponseEntity.ok(requestService.updateRequestStatus(id, request, changedByUserId));
    }
    
    @GetMapping
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }
}