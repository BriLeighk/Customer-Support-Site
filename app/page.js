import Header from './components/Header';


export default function Home() {
    return (
        <div className='home-div'>
            <Header />
            <h1>AI Customer Support</h1>
            <main>
                <p>Welcome to our Customer Support website! <br/>
                Create an account and log in to start using our AI Chatbot.
                </p>

            </main>
        </div>
    );
}
