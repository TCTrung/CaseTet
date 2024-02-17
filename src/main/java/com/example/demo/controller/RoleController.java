package com.example.demo.controller;

import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping("/roles")
    public ResponseEntity<?> getAllRole() {
        return new ResponseEntity<>(roleService.getAllRole(), HttpStatus.OK);
    }
}
