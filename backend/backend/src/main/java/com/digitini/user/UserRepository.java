package com.digitini.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByCin(String cin);
    
    boolean existsByEmail(String email);
    
    boolean existsByCin(String cin);
    
    // Alternative query-based methods if the above don't work
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email")
    boolean existsByEmailAddress(@Param("email") String email);
    
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.cin = :cin")
    boolean existsByCinNumber(@Param("cin") String cin);
}