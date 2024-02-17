package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/saveUser")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/editUser/{id}")
    public ResponseEntity<?> editUser(@RequestBody User user, @PathVariable Long id) {
        return new ResponseEntity<>(userService.editUser(user, id), HttpStatus.OK);
    }

    @GetMapping("/searchUser")
    public ResponseEntity<?> searchUserByName(@RequestParam String nameUser) {
        List<User> users = userService.searchUserByName(nameUser);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
