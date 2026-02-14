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
