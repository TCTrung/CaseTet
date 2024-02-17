package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;

public interface IUserService {
    public User saveUser(User user);

    public List<User> getAllUser();
    List<User> searchUserByName(String userName);

    public User getUserById(Long id);

    public String deleteUser(Long id);

    public User editUser(User user,Long id);
}
