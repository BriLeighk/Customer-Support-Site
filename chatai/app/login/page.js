import Header from '../components/Header';
import "./login.css";
import Link from 'next/link'; // Import Link for navigation

export default function Login() {
    return (
        
        <div className='login'>
            <Header />
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form>
                <h1>Login Form</h1>
                <label for="username">Email</label>
                <input type="text" placeholder="Email" id="username"></input>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password"></input>

                <button>Log In</button>
                <div class="social">
                    <div class="go"><i class="fab fa-google"></i>  Google</div>
                    
                    <Link href="/register" style={{ textDecoration: 'none' }}>
                    <div class="register-btn"> Create an Account</div>
                    </Link>
                    
                </div>
            </form>
            
        </div>
    );
}
