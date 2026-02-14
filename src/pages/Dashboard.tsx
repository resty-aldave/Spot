import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getBusinesses, saveBusinessUpdate, type SubBusiness } from '../utils/dataStore';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [myBusiness, setMyBusiness] = useState<SubBusiness | null>(null);
    const [availability, setAvailability] = useState(50);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Fetch user's business from local data store
        const businesses = getBusinesses();
        const match = businesses.find((b) => b.email === user.email);

        if (match) {
            setMyBusiness(match);
            setAvailability(match.availabilityPercentage);
        } else {
            console.warn("User logged in but no business found");
        }
    }, [user, navigate]);

    const handleUpdate = async () => {
        if (!myBusiness) return;
        setIsSaving(true);

        // Update local object
        const updatedBusiness = { ...myBusiness, availabilityPercentage: availability };
        setMyBusiness(updatedBusiness);

        // Save to data store effectively
        saveBusinessUpdate(updatedBusiness);

        setTimeout(() => {
            setIsSaving(false);
            // alert("Update successful!"); // Optional: Feedback is in button text
        }, 500);
    };

    if (!myBusiness) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <Navbar />
            <div className="flex-grow pt-32 px-6 container mx-auto pb-20">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <img src={myBusiness.image} alt={myBusiness.name} className="w-full md:w-64 h-48 object-cover rounded-xl shadow-md" />

                        <div className="flex-grow w-full">
                            <h1 className="text-3xl font-bold font-poppins text-primary mb-2">{myBusiness.name}</h1>
                            <p className="text-gray-500 font-inter mb-6">{myBusiness.location}</p>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <label className="block text-gray-700 font-bold mb-4 font-inter">
                                    Current Availability: <span className="text-2xl text-accent ml-2">{availability}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={availability}
                                    onChange={(e) => setAvailability(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent mb-6"
                                />
                                <button
                                    onClick={handleUpdate}
                                    disabled={isSaving}
                                    className={`w-full py-3 rounded-lg font-bold transition-all shadow-md ${isSaving ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-slate-700'
                                        }`}
                                >
                                    {isSaving ? 'Updated!' : 'Update Availability'}
                                </button>
                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    Updates appear immediately on the "Find a Spot" page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
