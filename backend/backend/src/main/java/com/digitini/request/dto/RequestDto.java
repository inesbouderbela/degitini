package com.digitini.request.dto;

import com.digitini.model.enums.RequestStatus;
import com.digitini.model.enums.ServiceType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestDto {
    private Long id;
    private ServiceType serviceType;
    private String title;
    private String description;
    private RequestStatus status;
    private String trackingNumber;
    private LocalDateTime submittedAt;
    private LocalDateTime resolvedAt;
    private Long userId;
    private String userFullName;
}