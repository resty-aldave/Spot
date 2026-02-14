import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { registerNewUser } from '../utils/dataStore';

const UserRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to local storage via dataStore
            registerNewUser(formData);

            // Redirect after brief delay
            setTimeout(() => {
                setLoading(false);
                alert("Account created successfully! Please login.");
                navigate('/login');
            }, 800);

        } catch (err) {
            console.error('Registration failed:', err);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <Navbar />
            <div className="flex-grow pt-32 px-6 container mx-auto pb-20 flex justify-center items-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h1 className="text-3xl font-bold font-poppins text-primary mb-2 text-center">Create Account</h1>
                    <p className="text-center text-gray-500 mb-8 font-inter">Sign up to find and book spots</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Full Name</label>
                            <input name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Email</label>
                            <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Password</label>
                            <input name="password" type="password" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-slate-700 transition-colors shadow-lg text-lg ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-600">
                        Looking to register a business? <Link to="/register" className="text-accent font-bold hover:underline">Click here</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserRegister;
