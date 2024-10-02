import React, {useState} from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {BookmarkAdd, ExpandMore} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {createCommentAction, likePostAction} from "../../pages/Redux/Post/post.action";
import {useDispatch, useSelector} from "react-redux";
import {isLikedByReqUser} from "../../Utils/IsLikedByReqUser";


const PostCard = ({ item }) => {
    const [showComments, setShowComments] = useState(false);
    const handleShowComments = () => setShowComments(!showComments);
    const dispatch = useDispatch();

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content,
            },
        };
        dispatch(createCommentAction(reqData));
    };

    const { post , auth} = useSelector((store) => store);

    const handleLikePost = () => {
        dispatch(likePostAction(item.id));
    };

    if (!item || !item.user) {
        return null;
    }
    console.log("liked by ", isLikedByReqUser(auth.user.id, item));

    return (
        <Card className="">
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {item.user.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={"@" + item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}
            />
            <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="Post Image"
            />
            <CardContent>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {item.caption}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className="flex justify-between">
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                    </IconButton>
                    <IconButton>
                        {<ShareIcon/>}
                    </IconButton>
                    <IconButton onClick={handleShowComments}>
                        {<ChatIcon/>}
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                    </IconButton>
                </div>
            </CardActions>
            {showComments && (
                <section>
                    <div className="flex items-center space-x-5 mx-3 my-5">
                        <Avatar/>
                        <input
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleCreateComment(e.target.value);
                                }
                            }}
                            className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full py-2 px-5"
                            type="text"
                            placeholder="write your comment..."
                        />
                    </div>
                    <Divider/>
                    {item.comments?.map((comment) => (
                        <div className="mx-3 space-y-2 my-5 text-xs" key={comment.id}>
                            <div className="flex items-center space-x-5">
                                <Avatar sx={{height: "2rem", width: "2rem", fontSize: "0.8rem"}}>
                                    {comment.user?.firstName[0]}
                                </Avatar>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </Card>
    );
};

export default PostCard;
