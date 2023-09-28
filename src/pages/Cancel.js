import { Link } from "react-router-dom";

const  Cancel=() =>{
    const styles = {
        color: 'white',         
        textAlign: 'center',   
        margin: '50px'        
      };
    return (
        <>
        <h1 style={styles}>Sorry to see you cancelled your Stripe payment!
        <br></br>
        <Link to="/">Return to Home Page</Link>
        </h1>
        </>
    )
}

export default Cancel;