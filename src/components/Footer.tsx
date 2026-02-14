// import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = `/#${id}`;
        }
    };

    return (
        <footer className="bg-gray-100 text-gray-700 py-12 border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* Text Logo: SPT #0F172A, O #EAB308 */}
                    <div className="flex items-center mb-6 md:mb-0 cursor-pointer select-none" onClick={() => scrollToSection('home')}>
                        <span className="font-poppins font-bold text-3xl tracking-tight">
                            <span className="text-[#0F172A]">SP</span>
                            <span className="text-[#EAB308]">O</span>
                            <span className="text-[#0F172A]">T</span>
                        </span>
                    </div>

                    <ul className="flex flex-wrap justify-center space-x-6 md:space-x-10 text-gray-700 font-poppins text-lg">
                        <li>
                            <button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">Home</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('businesses')} className="hover:text-accent transition-colors">Businesses</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('partners')} className="hover:text-accent transition-colors">Partners</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">About</button>
                        </li>
                    </ul>
                </div>

                <div className="text-center pt-8 border-t border-gray-200/50">
                    <p className="text-gray-500 font-inter text-sm">© SPOT 2026. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
