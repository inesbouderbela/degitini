package com.digitini.request.dto;

import com.digitini.model.enums.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateRequestStatusRequest {
    
    @NotNull(message = "Status is required")
    private RequestStatus status;
    
    private String notes;
}