import User from "../models/user.model.js"
import Message from "../models/message.model.js";
export const getUsersForSidebar=async (req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUser=await User.find({id: $ne(loggedInUserId)}).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUsersForSidebar",error.message);
        res.status(500).json({message:"Internal server error"});
    }
  
}

export const getMessages=async (req,res)=>{
    try {
        const {id:userToChat}=req.params;
        const myId=req.user._id;

        const messages=Message.find({
            $or:[
                {senderId:myId,receiverId:userToChat},
                {senderId:userToChat,receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
            console.log("Error in getMessages controller",error.message);
             res.status(500).json({message:"Internal server error"});
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}