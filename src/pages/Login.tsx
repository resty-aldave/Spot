import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { getBusinesses, getUsers } from '../utils/dataStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [loginType, setLoginType] = useState<'business' | 'user'>('business');
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
            await new Promise(resolve => setTimeout(resolve, 500));

            if (loginType === 'business') {
                const businesses = getBusinesses();
                const userMatch = businesses.find((b) =>
                    b.email &&
                    b.email.toLowerCase() === email.toLowerCase().trim() &&
                    b.password === password
                );

                if (userMatch) {
                    const userName = userMatch.name || 'Business User';
                    login(userMatch.email || email, 'business', userName);
                    navigate('/dashboard');
                } else {
                    setError('Invalid business credentials.');
                }
            } else {
                // User login
                const users = getUsers();
                const userMatch = users.find((u) =>
                    u.email.toLowerCase() === email.toLowerCase().trim() &&
                    u.password === password
                );

                if (userMatch) {
                    login(userMatch.email, 'user', userMatch.name);
                    navigate('/'); // Users go to home/browse
                } else {
                    setError('Invalid user credentials.');
                }
            }

        } catch (err) {
            console.error("Login error:", err);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Simulation
        alert("Google Login is simulated for this demo. Please use the email/password form.");
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h2 className="text-3xl font-bold font-poppins text-primary mb-6 text-center">Welcome Back</h2>

                    {/* Toggle Switch */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => { setLoginType('business'); setError(''); }}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginType === 'business' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FontAwesomeIcon icon={faBuilding} /> Business
                        </button>
                        <button
                            onClick={() => { setLoginType('user'); setError(''); }}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginType === 'user' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FontAwesomeIcon icon={faUser} /> User
                        </button>
                    </div>

                    {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">{error}</div>}

                    {loginType === 'business' && (
                        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg mb-6 text-xs text-center border border-blue-200">
                            <strong>Demo Business:</strong><br />
                            Email: example.@gmail.com<br />
                            Password: 12345678
                        </div>
                    )}

                    {/* Google Login (Common for both) */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-all mb-6 flex items-center justify-center gap-3 font-inter"
                    >
                        {/* Simple G icon representation if FA not available, or use text */}
                        <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.769 C -12.984 43.769 -11.404 44.369 -10.154 45.579 L -6.724 42.129 C -8.804 40.189 -11.514 38.999 -14.754 38.999 C -19.444 38.999 -23.494 41.699 -25.464 45.619 L -21.484 48.729 C -20.534 45.879 -17.884 43.769 -14.754 43.769 Z" />
                            </g>
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="relative flex py-2 items-center mb-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR WITH EMAIL</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

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

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">Don't have an account? </span>
                        {loginType === 'business' ? (
                            <Link to="/register" className="text-accent font-bold hover:underline">Register Business</Link>
                        ) : (
                            <Link to="/register-user" className="text-accent font-bold hover:underline">Create User Account</Link>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
