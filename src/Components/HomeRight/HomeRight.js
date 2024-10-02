import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import {Card} from "@mui/material";

const HomeRight=()=>{
    const popularUser = [1,1,1,1,1];
    return(
        <div className="pr-5">
            <SearchUser/>
            <Card className="p-5">
                <div className="flex justify-between py-5 items-center">
                    <p className="font-semibold top-70">Suggestions for you</p>
                    <p className="text-xs font-semibold text-opacity-95">View All</p>
                </div>
                <div>
                    {popularUser.map( (item)=><PopularUserCard/>)}
                </div>
            </Card>
        </div>
    )
}

export default HomeRight