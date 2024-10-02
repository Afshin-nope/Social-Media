import {Avatar} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";


const StoryCircle=()=>{
    return(
        <div>
            <div className="flex flex-col items-center mr-4 cursor-pointer">
                <Avatar sx={{height: "5rem", width: "5rem"}} src="https://www.si.com/.image/t_share/MjA1MDQzMjUyNDE4NTg2MjQ0/usatsi_22348379.jpg">
                </Avatar>
                <p>Afshin</p>
            </div>
        </div>
    )
}

export default StoryCircle

