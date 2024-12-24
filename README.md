# OTP
OTP Verfication.

frontend : npm run dev
backend : npm run dev

as both the servers run on a same command.

-I have made custom inputs of each verfication number to limit the size to 1 and used useref hook for the refernce of focus , mean on which input , i am currently in.
-I have implemented a logic to make an otp array, so that i first set the input focus and set the target.value by which otp array updates.
- Use regular expression to verify that user can only enter 0-9 numbers , if other than it, then i will put "" empty and check that if target.value is empty , then i will remian on same input.
- just like it, i use backspace logic, where key=backspace then only i move my input focus to previous one.
- use setinteval to show the resend otp time which starts from 30s ang go to 0. 
- after all use handlesubmit logic to call post api when otp.length == 6 , and checks on the backend of hardcoded value that whether it is equal and alerts the message.
- for resendOTP, i just make sure the remove OTP and make it empty so that user can enter OTP again and starts the time again from 30s.

