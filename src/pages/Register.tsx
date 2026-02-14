import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { registerNewBusiness } from '../utils/dataStore';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '', // New field
        googleMapsLink: '', // New field
        availabilityPercentage: 50, // Default
        email: '',
        password: '',
        image: 'https://placehold.co/600x400/0f172a/ffffff?text=New+Spot' // Default placeholder
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(true);
    };

    const confirmRegistration = async () => {
        try {
            // Save to local storage via dataStore
            registerNewBusiness({
                id: Date.now(), // Temporary unique ID
                ...formData
            });

            // Redirect after brief delay
            setTimeout(() => {
                setShowModal(false);
                alert("Registration Successful! Please login with your new account.");
                navigate('/login');
            }, 800);

        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <Navbar />
            <div className="flex-grow pt-32 px-6 container mx-auto pb-20 flex justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"> {/* Reduced width for single column feel */}
                    <h1 className="text-3xl font-bold font-poppins text-primary mb-8 text-center">Register Your Business</h1>

                    <button
                        type="button"
                        onClick={() => alert("Google Registration is simulated for this demo. Please use the form below.")}
                        className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-all mb-6 flex items-center justify-center gap-3 font-inter"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.769 C -12.984 43.769 -11.404 44.369 -10.154 45.579 L -6.724 42.129 C -8.804 40.189 -11.514 38.999 -14.754 38.999 C -19.444 38.999 -23.494 41.699 -25.464 45.619 L -21.484 48.729 C -20.534 45.879 -17.884 43.769 -14.754 43.769 Z" />
                            </g>
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="relative flex py-2 items-center mb-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR REGISTER BELOW</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Single Column Layout */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Business Name</label>
                            <input name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Location</label>
                            <input name="location" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>

                        {/* Added Description Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                onChange={handleChange}
                                placeholder="Describe your spot..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent resize-none font-inter"
                            />
                        </div>

                        {/* Google Maps Link Field */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Google Maps Link</label>
                            <input
                                name="googleMapsLink"
                                onChange={handleChange}
                                placeholder="Paste Google Maps URL here..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent font-inter"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Email</label>
                            <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Password</label>
                            <input name="password" type="password" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter">Image URL</label>
                            <input name="image" placeholder="https://..." onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>

                        <button type="submit" className="w-full bg-accent text-primary font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg text-lg">
                            Review & Register
                        </button>
                    </form>
                </div>
            </div>
            <Footer />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100">
                        <h3 className="text-2xl font-bold font-poppins text-primary mb-4">Confirm Registration</h3>
                        <div className="space-y-3 font-inter text-gray-600 mb-8">
                            <p><strong>Name:</strong> {formData.name}</p>
                            <p><strong>Location:</strong> {formData.location}</p>
                            <p><strong>GMaps Link:</strong> {formData.googleMapsLink || 'Not provided'}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold">Cancel</button>
                            <button onClick={confirmRegistration} className="flex-1 py-3 bg-accent text-primary rounded-lg hover:bg-yellow-400 font-bold shadow-md">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
