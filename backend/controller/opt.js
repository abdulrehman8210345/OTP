export const postOtp = async (req,res)=>{
    try {
        const {enteredOtp} = req.body;
        const hardcodedotp = "123456";
    
        if(enteredOtp === hardcodedotp){
            res.json({message:"OTP Verified Successfully",success:true})
        }
        else{
            res.json({message:"Invalid OTP, Please try again",success:false})
        }
        
    } catch (error) {
        console.log("Error in otp verification",error)
    }
 

}