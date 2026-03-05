package com.example.backend.Service;

import java.util.List;

import com.example.backend.Entity.Role;

public interface RoleService {

    Role addRole(Role role);

    List<Role> getAllRoles();

    void deleteRole(Long id);

    Role getRoleById(Long id);

}