import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import MiddlePart from "../../Components/Middlepart/MiddlePart";
import Reels from "../../Components/Reels/Reels";
import CreateReelsForm from "../../Components/Reels/CreateReelsForm";
import Profile from "../Profile/Profile";
import HomeRight from "../../Components/HomeRight/HomeRight";
import SideBar from "../../Components/SideBar/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {getProfileAction} from "../Redux/Auth/Auth.action";
import {store} from "../Redux/Store";

const HomePage=()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store=>store);
    console.log("auth", auth);
    return(
        <div className="px-20">
            <Grid container spacing={0}>
                <Grid item xs={0} lg={3}>
                    <div className="sticky top-0">
                        <SideBar/>
                    </div>
                </Grid>

                <Grid lg={location.pathname === "/" ? 6 : 9} item className="px-5 flex justify-center " xs={12}>
                    <Routes>
                        <Route path="/" element={<MiddlePart/>}/>
                        <Route path="/reels" element={<Reels/>}/>
                        <Route path="/create-reels" element={<CreateReelsForm/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                    </Routes>
                </Grid>
                {location.pathname==="/" && <Grid item lg={3} className="relative">
                    <div className="sticky w-full top-0">
                        <HomeRight/>
                    </div>
                </Grid>}
            </Grid>
        </div>
    )
}

export default HomePage