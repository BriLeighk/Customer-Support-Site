import Header from './components/Header';


export default function Home() {
    return (
        <div className='home-div'>
            <Header />
            <h1>AI Customer Support</h1>
            <main>
                <p>This is the home page. Navigate to the chatbot for assistance.</p>
            </main>
        </div>
    );
}
