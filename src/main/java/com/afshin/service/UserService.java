package com.afshin.service;

import com.afshin.exceptions.UserExceptions;
import com.afshin.models.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user);

    public User findUserById(Integer userId) throws UserExceptions;

    public User findUserByEmail(String email);

    public User followUser(Integer firstUserId, Integer secondUserId) throws UserExceptions;

    public User updateUser(User user, Integer userId) throws UserExceptions;

    public List<User> searchUser(String query);

    public User findUserByJwt(String jwt);
}
