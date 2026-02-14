import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import spotLogo from '../assets/spot.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        // Check if we are on the homepage
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay to allow navigation
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/');
            setIsOpen(false);
        }
    }

    return (
        <nav className="bg-[#1E293B]/95 backdrop-blur-sm px-6 py-4 fixed w-full top-0 z-50 shadow-md border-b border-gray-700/50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
                    <img src={spotLogo} alt="SPOT Logo" className="h-10 md:h-12" />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                </button>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center space-x-8 text-white font-poppins text-lg transition-all">
                    <li><button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">Home</button></li>
                    <li><button onClick={() => scrollToSection('businesses')} className="hover:text-accent transition-colors">Businesses</button></li>
                    <li><button onClick={() => scrollToSection('partners')} className="hover:text-accent transition-colors">Partners</button></li>
                    <li><button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">About</button></li>

                    {user ? (
                        <>
                            {user.role === 'business' ? (
                                <li><Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
                            ) : (
                                <li><span className="text-accent font-bold flex items-center gap-2"><FontAwesomeIcon icon={faUser} /> Hi, {user.name?.split(' ')[0]}</span></li>
                            )}
                            <li><button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md">Logout</button></li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="bg-accent text-primary px-6 py-2 rounded-full hover:bg-yellow-400 transition-all font-bold text-sm shadow-lg flex items-center gap-2 transform hover:-translate-y-1">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#1E293B] border-t border-gray-700 shadow-xl">
                    <ul className="flex flex-col p-6 space-y-6 text-white font-poppins text-lg text-center">
                        <li><button onClick={() => scrollToSection('home')} className="block w-full hover:text-accent">Home</button></li>
                        <li><button onClick={() => scrollToSection('businesses')} className="block w-full hover:text-accent">Businesses</button></li>
                        <li><button onClick={() => scrollToSection('partners')} className="block w-full hover:text-accent">Partners</button></li>
                        <li><button onClick={() => scrollToSection('about')} className="block w-full hover:text-accent">About</button></li>
                        {user ? (
                            <>
                                <li><Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-accent font-bold">Your Dashboard</Link></li>
                                <li><button onClick={handleLogout} className="block w-full text-red-400">Logout</button></li>
                            </>
                        ) : (
                            <li><Link to="/login" onClick={() => setIsOpen(false)} className="inline-block bg-accent text-primary px-8 py-3 rounded-full font-bold shadow-lg">Login</Link></li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
