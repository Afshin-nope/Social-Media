package com.afshin.service;

import com.afshin.models.Post;
import com.afshin.models.User;
import com.afshin.repository.PostRepository;
import com.afshin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setVideo(post.getVideo());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setUser(user);
        postRepository.save(newPost);
        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if (post.getUser().getId() != user.getId()){
            throw new Exception("cant delete post");
        }

        /*for (User user1 : userRepository.findAll()){
            if (user1.getSavedPosts().contains(post)){
                user1.getSavedPosts().remove(post);
                userRepository.save(user1);
            }
        }*/
        postRepository.delete(post);
        return "post deleted succesfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception{
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()){
            return post.get();
        }
        throw new Exception("post unavailable");
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();

    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);
        if (user.getSavedPosts().contains(post)){
            user.getSavedPosts().remove(post);
        }else {
            user.getSavedPosts().add(post);
        }

        userRepository.save(user);
        return post;
    }

    @Override
    public Post likedPost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if (post.getLiked().contains(user)){
            post.getLiked().remove(user);
        }else {
            post.getLiked().add(user);
        }

        return postRepository.save(post);
    }
}
