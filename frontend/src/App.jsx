import { useEffect, useRef, useState } from "react"
import axios from "axios"


const App = () => {

  const [otp, setotp] = useState(Array(6).fill(""));
  const refs = useRef(Array(6).fill(null));
  const [timer, setTimer] = useState(30);
  const isbuttonDisabled = otp.join("").length !==6;

  useEffect(() => {

    const interval = setInterval(()=>{
      setTimer((pre)=> pre > 0 ? pre-1 : 0)
    },1000)

    return ()=> clearInterval(interval)

    
  }, [])


  const handleChange = (e,i)=>{

    const value = e.target.value.replace(/[^0-9]/g, "");

    const enteredOtp = [...otp];
    enteredOtp[i] = value;
    setotp(enteredOtp);

    if(value && i < refs.current.length -1){
      refs.current[i+1].focus();
    }

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
      if (enteredOtp.length === 6) {
        console.log(enteredOtp);

        const response = await axios.post("http://localhost:5000/api/post",{enteredOtp},
       
        )
        console.log(response.data);
        setotp(Array(6).fill(""));
        refs.current.forEach((ref) => ref && (ref.value = ""));
        alert(response.data.message);
      }
      
    } catch (error) {
      console.log(error)
      
    }
   
  }

  const handleResendOtp =  ()=>{
    setTimer(30);
    setotp(Array(6).fill(""));
    refs.current.forEach((ref) => ref && (ref.value = ""));

    refs.current[0].focus();
    
  }

  const handlekeyDown = (e,i)=>{
    if(e.key == "Backspace" && otp[i]=== ""){
      if(i > 0){
        refs.current[i-1].focus();
      }
      
    }
    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault(); 
    }

  }


  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column", height:"90vh", gap:"20px"}}>
         <label htmlFor="">Enter OTP</label>
      <div style={{display:"flex", gap:"10px"}}>
        {
          otp.map((ot,i)=>{
            return (
              <input className="input-otp" 
              type="text" 
              key={i}
              inputMode="numeric" 
              maxLength={1}
              pattern="[0-9]"
              onKeyDown={(e)=>handlekeyDown(e,i)}
              ref={(elem)=>refs.current[i] = elem}
              
              onChange={(event)=>handleChange(event,i)}/>
              
            )
          })
        }
      
     
       
      </div>
      <div>{
        timer > 0 ? 
        <p>Resend OTP in {timer} seconds</p>:
        <button onClick={handleResendOtp}>Resend OTP</button>
        
        }</div>
  <button disabled={isbuttonDisabled} onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App