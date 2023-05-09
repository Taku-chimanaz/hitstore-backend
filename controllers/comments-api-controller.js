import Comment from "../Models/Comment.js";


const getGossipComments = (req,res) => {

    const id = req.params.id;

    Comment.find({commentedPost: id})
    .then(comments => {
        res.json({
            message: "Comments fetched successfully",
            comments
        })
    })
    .catch(() =>{
        res.status(500).json({
            message: "Somethinng went wrong"
        })
    })

}

const postComment = (req,res)=> {
    console.log(req.body)
    const {commentedPost, commentBody}= req.body;

    let owner = req.body.owner;
 
    if(owner === ""){
        owner = "anonymous"
    }

    new Comment({
        owner,
        commentedPost,
        commentBody
    }).save()
    .then(comment => {
        res.json({
            message: "Comment posted successfully",
            comment
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

export default {
    getGossipComments,
    postComment
}