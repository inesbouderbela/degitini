package com.digitini.request;

import com.digitini.model.BaseEntity;
import com.digitini.model.enums.RequestStatus;
import com.digitini.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "request_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestHistory extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;
    
    @Enumerated(EnumType.STRING)
    private RequestStatus fromStatus;
    
    @Enumerated(EnumType.STRING)
    private RequestStatus toStatus;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by_user_id")
    private User changedBy;
    
    private String notes;
    
    @Builder.Default
    private LocalDateTime changedAt = LocalDateTime.now();
}