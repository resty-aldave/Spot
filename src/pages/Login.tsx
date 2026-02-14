import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log("Attempting login with:", email);
            const res = await fetch('http://localhost:3000/businesses');
            if (!res.ok) throw new Error("Failed to fetch businesses");

            const data = await res.json();
            console.log("Fetched users:", data.length); // Security: Don't log full data in prod

            // Find user match
            const userMatch = data.find((b: any) =>
                b.email &&
                b.email.toLowerCase() === email.toLowerCase().trim() &&
                b.password === password
            );

            if (userMatch) {
                console.log("Login successful for:", userMatch.name);
                login(userMatch.email, userMatch.name);
                navigate('/dashboard');
            } else {
                console.warn("Login failed: Invalid credentials");
                setError('Invalid credentials. Please try again.');
            }

        } catch (err) {
            console.error("Login error:", err);
            setError('Something went wrong. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h2 className="text-3xl font-bold font-poppins text-primary mb-6 text-center">Login to Dashboard</h2>

                    {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-yellow-400 transition-all shadow-lg transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
