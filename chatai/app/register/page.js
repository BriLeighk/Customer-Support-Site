import Header from '../components/Header';
import "../login/login.css";
import Link from 'next/link'; // Import Link for navigation
import "./register.css";

export default function Register() {
    return (
        
        <div className='register'>
            <Header />
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form>
                <h1>Register Form</h1>
                <label for="username">Email</label>
                <input type="text" placeholder="Email" id="username"></input>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password"></input>

                <button>Create Account</button>
                <div class="social">
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                    <div class="login-btn"> Already have an account? Log In</div>
                    </Link>
                    
                </div>
            </form>
            
        </div>
    );
}
