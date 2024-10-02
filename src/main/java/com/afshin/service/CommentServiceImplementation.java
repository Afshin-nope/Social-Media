package com.afshin.service;

import com.afshin.models.Comment;
import com.afshin.models.Post;
import com.afshin.models.User;
import com.afshin.repository.CommentRepository;
import com.afshin.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImplementation implements CommentService {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception{
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);

        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        post.getComments().add(comment);
        Comment savedComment = commentRepository.save(comment);
        postRepository.save(post);
        return savedComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception{
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (!optionalComment.isPresent()){
            throw new Exception("comment doesnt exist");
        }
        return optionalComment.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception{
        Comment comment = findCommentById(commentId);
        User user = userService.findUserById(userId);

        if (!comment.getLiked().contains(user)){
            comment.getLiked().add(user);
        }else {
            comment.getLiked().remove(user);
        }

        return commentRepository.save(comment);
    }
}
