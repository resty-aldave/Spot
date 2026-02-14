import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Businesses from '../components/Businesses';
import Partners from '../components/Partners';
import About from '../components/About';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Hero />
            <Businesses />
            <Partners />
            <About />
            <Footer />
        </div>
    );
};

export default LandingPage;
