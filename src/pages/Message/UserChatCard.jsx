import React from "react";
import {Avatar, Card, CardHeader, IconButton} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useSelector} from "react-redux";

const UserChatCard=({chat})=>{
    const {auth} = useSelector((store)=>store);
    return(
        <Card>
            <CardHeader avatar={
                <Avatar sx={{width:"3.5rem", height:"3.5rem", fontSize:"1.5rem", bgcolor:"#191c29", color:"rgb(88,129,250)"}} src="https://www.blackpast.org/wp-content/uploads/prodimages/files/blackpast_images/LeBron_James_aiming_basketball_Cleveland_Cavaliers_vs_Washington_Wizards_Verizon_Center_Washington_DC_November_21_2014.jpg"/>
            } action={<IconButton>
                <MoreHorizIcon/>
            </IconButton>}
                        title={auth.user?.id===chat.users[0].id?chat.users[1].firstName+" "+chat.users[1].lastName:chat.users[0].firstName+" "+chat.users[0].lastName} subheader="new message">

            </CardHeader>
        </Card>
    )
}

export default UserChatCard