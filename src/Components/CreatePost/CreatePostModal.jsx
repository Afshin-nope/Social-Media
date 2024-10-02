import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import {Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Typography} from "@mui/material";
import {useFormik} from "formik";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import {updateProfileAction} from "../../pages/Redux/Auth/Auth.action";
import {uploadToCloudinary, uploadToCloudninary} from "../../Utils/UploadToCloudinary";
import {useDispatch} from "react-redux";
import {createCommentAction, createPostAction} from "../../pages/Redux/Post/post.action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: "0.6 rem",
    boxShadow: 24,
    p: 4,
    outline: "none"
};

const CreatePostModal=({handleClose, open})=>{
    const formik = useFormik({
        initialValues:{
            caption:"",
            image:"",
            video:""
        },
        onSubmit:(values)=>{
            console.log("formik values ", values);
            dispatch(createPostAction(values));
        }
    });
    const [selectedImage, setSelectedImage] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSelectImage = async (event)=>{
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl);
    };

    const handleSelectVideo = async (event)=>{
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl);
    }

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className="flex items-center space-x-4">
                                <Avatar/>
                                <div>
                                    <p className="text-lg font-bold">Afshin Code</p>
                                    <p className="text-sm">@afshin</p>
                                </div>
                            </div>
                            <textarea className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
                                      placeholder="write caption..." rows="4" onChange={formik.handleChange}
                                      name="caption" value={formik.values.caption}></textarea>
                            <div className="mt-5 flex items-center space-x-5">
                                <div>
                                    <input id="image-input" type="file" accept="image/*" onChange={handleSelectImage}
                                           style={{display: "none"}}/>
                                    <label htmlFor="image-input">
                                        <IconButton color="primary" component="span">
                                            <ImageIcon/>
                                        </IconButton>
                                    </label>
                                    <span>Image</span>
                                </div>
                                <div>
                                    <input id="video-input" type="file" accept="video/*" onChange={handleSelectVideo}
                                           style={{display: "none"}}/>
                                    <label htmlFor="video-input">
                                        <IconButton color="primary" component="span">
                                            <VideoCallIcon/>
                                        </IconButton>
                                    </label>
                                    <span>Video</span>
                                </div>
                            </div>
                            {selectedImage && <div>
                                <img src={selectedImage} className="h-[10rem]"/>
                            </div>}

                            <div className="flex w-full justify-end">
                                <Button type="submit" variant="contained" sx={{borderRadius:"1.5rem"}} >Post</Button>
                            </div>
                        </div>
                    </form>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
}

export default CreatePostModal