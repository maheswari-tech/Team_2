package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.backend.Entity.Role;

public interface RoleRepo extends JpaRepository<Role, Long>{

    Optional<Role> findByRoleName(String roleName);

}