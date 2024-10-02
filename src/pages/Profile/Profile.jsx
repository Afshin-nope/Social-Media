import React from "react";
import {useParams} from "react-router-dom";
import {Avatar, Box, Button, Card} from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PostCard from "../../Components/Post/PostCard";
import UserReelCard from "../../Components/Reels/UserReelCard";
import {useSelector} from "react-redux";
import ProfileModal from "./ProfileModal";


const Profile = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {id} = useParams();
    const posts =[1,1,1,1];
    const reels =[1,1,1,1];
    const savedPosts =[1,1,1,1];
    const [value, setValue] = React.useState('post');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {auth} = useSelector(store=>store);

    const tabs = [{value:"post", name:"post"}, {value:"reels", name:"reels"}, {value:"saved", name:"saved"}, {value:"repost", name:"repost"}];
    return (
        <Card className="my-10 w-[70%]">
            <div className="rounded-md">
                <div className="h-[15rem]">
                    <img className="w-full h-full rounded-t-md" src="https://cdn.nba.com/manage/2024/06/16x9-homehero-2.png" alt="" />
                </div>
                <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar className="transform -translate-y-24" sx={{ width: "10rem", height: "10rem" }} src="https://media.cnn.com/api/v1/images/stellar/prod/211220145332-nba-tease.jpg?q=h_1527,w_2292,x_0,y_0" />
                    {true ?
                        <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleOpenProfileModal}>  {/* Added onClick */}
                            Edit profile
                        </Button>
                        : <Button variant="outlined">Follow</Button>
                    }
                </div>
                <div className="pt-5 flex flex-col items-start ml-5">
                    <div>
                        <h1 className="font-bold text-xl">
                            {auth.user?.firstName + " " + auth.user?.lastName}
                            <p>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
                        </h1>
                    </div>
                    <div className="flex gap-5 items-center py-3">
                        <span>41 post</span>
                        <span>35 followers</span>
                        <span>5 followings</span>
                    </div>
                    <div>
                        <p>
                            Bio
                        </p>
                    </div>
                </div>
                <section>
                    <Box sx={{ width: '100%' , borderBottom:1, borderColor:"divider"}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            {tabs.map( (item)=><Tab value={item.value} label={item.name} />)}
                        </Tabs>
                    </Box>
                    <div className="flex justify-center">
                        {value==="post"? <div className="space-y-5 w-[70%] my-10">
                            {posts.map( (item)=> <div className="border rounded-md border-slate-500">
                                <PostCard/>
                            </div>)}
                        </div> : value==="reels"? <div className="flex justify-center flex-wrap gap-2 my-10 ">
                                {reels.map( (item)=> <UserReelCard/> )}
                            </div>
                            : value === "saved" ? <div className="space-y-5 w-[70%] my-10">
                                    {posts.map((item) => <div className="border rounded-md border-slate-500">
                                        <PostCard/>
                                    </div>)}
                                </div>
                                : (
                                    <div>
                                        repost
                                    </div>
                                )}
                    </div>
                </section>
            </div>
            <section>
                <ProfileModal open={open} handleClose={handleClose} />
            </section>
        </Card>
    );
};

export default Profile;
