package com.afshin.controller;

import com.afshin.exceptions.UserExceptions;
import com.afshin.models.Reels;
import com.afshin.models.User;
import com.afshin.repository.UserRepository;
import com.afshin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/api/users")
    public List<User> getUsers(){
        List<User> users= userRepository.findAll();
        return users;
    }


    @GetMapping("/api/users/{userId}")
    public User findUserById(@PathVariable("userId") Integer id) throws UserExceptions {
        return userService.findUserById(id);
    }


    @PutMapping("/api/users")
    public User updateUser(@RequestBody User user, @RequestHeader("Authorization") String jwt) throws UserExceptions {
        User reqUser = getUserFromToken(jwt);
        return userService.updateUser(user, reqUser.getId());
    }

    /*@GetMapping("/users/{email}")
    public User findUserByEmail(@PathVariable("email") String email){
        return userService.findUserByEmail(email);
    }*/

    @PutMapping("/api/users/follow/{userId2}")
    public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserExceptions{
        User reqUser = userService.findUserByJwt(jwt);
        return userService.followUser(reqUser.getId(), userId2);
    }

    @GetMapping("/api/users/search")
    public List<User> searchUer(@RequestParam("query") String query){
        return userService.searchUser(query);
    }


    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        //user.setPassword(null);
        return user;
    }
}
