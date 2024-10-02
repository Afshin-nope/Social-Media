import React, {useEffect, useState} from "react";
import {Avatar, Card, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from "./StoryCircle";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import {useDispatch, useSelector} from "react-redux";
import {getAllPostAction} from "../../pages/Redux/Post/post.action";
import {store} from "../../pages/Redux/Store";


const MiddlePart=()=>{
    const story = [1,1,1,1,1];
    const posts=[1,1,1,1,1];
    const {post}= useSelector(store=>store);
    console.log("post store", post);
    const handleOpenCreatePostModel = ()=>{
        setOpenCreatePostModal(true);
        console.log("open post model...", openCreatePostModal);
    };
    const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
    const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllPostAction())
    },[post.newComment]);
    return(
        <div className="px-20">
            <section className="flex items-center p-5 rounded-b-md">
                <div className="flex flex-col items-center mr-4 cursor-pointer">
                    <Avatar sx={{height:"5rem", width:"5rem"}}>
                        <AddIcon sx={{fontSize:"3rem"}}/>
                    </Avatar>
                    <p>New</p>
                </div>
                {story.map( (item)=> <StoryCircle/>)}
            </section>
            <Card className="p-5 mt-5">
                <div className="flex justify-between">
                    <Avatar/>
                    <input onClick={handleOpenCreatePostModel} readOnly className="outline-none w-[90%] rounded-full px-5 bg-transparent border border-[#3b4054]" type="text"/>
                </div>
                <div className="flex justify-center mt-5 space-x-9">
                    <div className="flex items-center" onClick={handleOpenCreatePostModel}>
                        <IconButton color="primary">
                            <ImageIcon/>
                        </IconButton>
                        <span>Media</span>
                    </div>
                    <div className="flex items-center" onClick={handleOpenCreatePostModel}>
                        <IconButton color="primary">
                            <VideocamIcon/>
                        </IconButton>
                        <span>Video</span>
                    </div>
                    <div className="flex items-center" onClick={handleOpenCreatePostModel}>
                        <IconButton color="primary">
                            <ArticleIcon/>
                        </IconButton>
                        <span>Write Article</span>
                    </div>
                </div>
            </Card>
            <div className="space-y-5 mt-5">
                {post.posts.map( (item)=><PostCard item={item}/>)}
            </div>
            <div>
                <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal}/>
            </div>
        </div>
    )
}

export default MiddlePart