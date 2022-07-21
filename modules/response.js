
// user
const SendSuccessMessage = (res, data) => {
    return res.status(200).send({
        success:001,
        message:"success",
        data: data
    })
}
const SendErrorMessage = (res,data) => {
    return res.status(200).send({
        success:002,
        data: data
    })
}


const SendErrorMessageSv = (res) =>{
    return res.status(500).send({
        success: 005,
        message:" Server error",
        
    })
}


module.exports={
    SendSuccessMessage,
    SendErrorMessageSv,
    SendErrorMessage

}





