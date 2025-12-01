package com.digitini.request.mapper;

import com.digitini.request.Request;
import com.digitini.request.dto.CreateRequestRequest;
import com.digitini.request.dto.RequestDto;
import org.springframework.stereotype.Component;

@Component
public class RequestMapper {

    public Request toEntity(CreateRequestRequest dto) {
        if (dto == null) {
            return null;
        }
        
        return Request.builder()
                .serviceType(dto.getServiceType())
                .title(dto.getTitle())
                .description(dto.getDescription())
                // id, user, status, trackingNumber, submittedAt, resolvedAt are set separately
                .build();
    }
    
    public RequestDto toDto(Request request) {
        if (request == null) {
            return null;
        }
        
        return RequestDto.builder()
                .id(request.getId())
                .serviceType(request.getServiceType())
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .trackingNumber(request.getTrackingNumber())
                .submittedAt(request.getSubmittedAt())
                .resolvedAt(request.getResolvedAt())
                .userId(request.getUser() != null ? request.getUser().getId() : null)
                .userFullName(getUserFullName(request.getUser()))
                .build();
    }
    
    private String getUserFullName(com.digitini.user.User user) {
        if (user == null) {
            return "";
        }
        return user.getFirstName() + " " + user.getLastName();
    }
}