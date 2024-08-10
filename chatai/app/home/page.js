import Link from 'next/link';
import { FaRobot } from 'react-icons/fa'; // Make sure to install react-icons if you haven't

export default function Home() {
    return (
        <div className='home-div'>
            <header>
                <Link href="/chatbot">
                    <FaRobot size={30} /> {/* Icon linking to the chatbot */}
                </Link>
            </header>
            <h1>AI Customer Support</h1>
            <main>
                <p>This is the home page. Navigate to the chatbot for assistance.</p>
            </main>
        </div>
    );
}
