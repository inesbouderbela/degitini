package com.digitini.request;

import com.digitini.model.BaseEntity;
import com.digitini.model.enums.RequestStatus;
import com.digitini.model.enums.ServiceType;
import com.digitini.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private RequestStatus status = RequestStatus.SUBMITTED;
    
    private String trackingNumber;
    
    @Builder.Default
    private LocalDateTime submittedAt = LocalDateTime.now();
    
    private LocalDateTime resolvedAt;
}