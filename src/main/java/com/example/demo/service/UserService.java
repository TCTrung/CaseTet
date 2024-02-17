package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public List<User> searchUserByName(String userName) {
        return userRepository.findByUsernameContainingIgnoreCase(userName);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public String deleteUser(Long id) {
        User user = userRepository.findById(id).get();

        if (user != null) {
            userRepository.delete(user);
            return "User Delete Sucessfully";
        }

        return "Something wrong on server";
    }

    @Override
    public User editUser(User user, Long id) {
        User oldUser = userRepository.findById(id).get();

        oldUser.setName(user.getName());
        oldUser.setUsername(user.getUsername());
        oldUser.setPassword(user.getPassword());
        oldUser.setEmail(user.getEmail());
        oldUser.setRole(user.getRole());

        return userRepository.save(oldUser);
    }
}
