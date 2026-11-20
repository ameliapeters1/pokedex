import { useState } from "react"
import type { SubmitEvent } from "react"
import { register } from "../api/client"

function RegisterPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string|null>(null)
    const [isSubmitting,setIsSubmitting] = useState<boolean>(false)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault()

        setError(null)
        setIsSubmitting(true)

        try{
            // should put an access token into local storage upon registering 
            await register(email.trim(), password)
        }catch(err){
            if (err instanceof Error){
                setError(err.message)
            } else {
                setError("uh oh registration failed :(")
            }
        }
        finally{
            setIsSubmitting(false)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Sign up here!</h1>
            <label htmlFor="email">Email</label>
              <input 
              id="email" 
              type="text" 
              placeholder="Enter Email" 
              value={email}
              onChange={(event)=>setEmail(event.target.value)} 
              required/>

            <label htmlFor="password">password</label>
             <input 
             id="password" 
             type="password" 
             placeholder="Enter Password" 
             value={password} 
             onChange={(event)=>setPassword(event.target.value)}
             required/>

            {error && <p>Error found! {error}</p>}

            <button type="submit" className="signupbtn" disabled={isSubmitting}>{isSubmitting ? "Signing up...": "Sign up"}</button>

        </form>
    )
}

export default RegisterPage