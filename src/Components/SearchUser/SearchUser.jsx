import React, {useState} from "react";
import {Avatar, Card, CardHeader} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {searchUser} from "../../pages/Redux/Auth/Auth.action";
import {store} from "../../pages/Redux/Store";
import {createChat} from "../../pages/Redux/Message/message.action";

const SearchUser=()=>{
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const handleSearchUser=(e)=>{
        setUserName(e.target.value);
        console.log("search user...");
        dispatch(searchUser(userName));
    };
    const handleClick=(id)=>{
        dispatch(createChat({userId:id}));
    };
    const {message, auth} = useSelector(store=>store);
    return(
        <div>
            <div className="py-5 relative">
                <input type="text" className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full" placeholder="search user..." onChange={handleSearchUser}/>
                {userName && (
                    auth.searchUser.map((item)=><Card key={item.id} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
                        <CardHeader onClick={()=>{
                            handleClick(item.id);
                            setUserName("")
                        }}
                                    avatar={<Avatar src="https://cdn.nba.com/teams/uploads/sites/1610612747/2024/03/240302-the-legend-of-lebron-james-continues-IMG_9980-2.jpg"/>}
                                    title={item.firstName + " " + item.lastName} subheader={"@" + item.firstName + "_" + item.lastName} />
                    </Card>)
                )}
            </div>
        </div>
    )
}

export default SearchUser