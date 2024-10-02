package com.afshin.service;

import com.afshin.config.JwtProvider;
import com.afshin.exceptions.UserExceptions;
import com.afshin.models.User;
import com.afshin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        User savedUser = userRepository.save(newUser);

        return savedUser;
    }

    @Override
    public User findUserById(Integer userId) throws UserExceptions {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            return user.get();
        }
        throw new UserExceptions("User doesn't exist: " + userId);
    }

    @Override
    public User findUserByEmail(String email) {
        /*for (User user : userRepository.findAll()){
            if (user.getEmail().equals(email)){
                return user;
            }
        }
        return null;*/
        return  userRepository.findByEmail(email);
    }

    @Override
    public User followUser(Integer reqUserId, Integer secondUserId) throws UserExceptions {
        User reqUser = findUserById(reqUserId);
        User two = findUserById(secondUserId);
        two.getFollowers().add(reqUser.getId());
        reqUser.getFollowing().add(two.getId());
        userRepository.save(two);
        userRepository.save(reqUser);
        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws UserExceptions {
        Optional<User> user1 = userRepository.findById(userId);
        if (user1.isEmpty()){
            throw new UserExceptions("User doesn't exist: " + userId);
        }
        if (user.getEmail()!=null){
            user1.get().setEmail(user.getEmail());
        }
        /*if (user.getPassword()!=null){
            user1.get().setPassword(user.getPassword());
        }*/
        if (user.getGender()!=null){
            user1.get().setGender(user.getGender());
        }
        if (user.getFirstName()!=null){
            user1.get().setFirstName(user.getFirstName());
        }
        if (user.getLastName()!=null){
            user1.get().setLastName(user.getLastName());
        }
        userRepository.save(user1.get());
        return user1.get();
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);
        return user;
    }
}
