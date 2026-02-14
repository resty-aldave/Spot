import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBusinesses, type SubBusiness } from '../utils/dataStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faWifi, faCoffee, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BookingModal from '../components/BookingModal';

const BusinessDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [business, setBusiness] = useState<SubBusiness | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        if (id) {
            // Find business by ID in stored data
            const businesses = getBusinesses();
            const foundBusiness = businesses.find(
                (b) => b.id.toString() === id
            );

            if (foundBusiness) {
                setBusiness(foundBusiness);
            }
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-2xl font-bold text-primary animate-pulse">Loading Spot Details...</div>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Spot Not Found</h2>
                <p className="text-gray-600 mb-8">The business you are looking for might have been removed or does not exist.</p>
                <Link to="/businesses" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors">
                    Back to All Spots
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero / Image Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
                <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                    <Link to="/businesses" className="text-white hover:text-accent transition-colors flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-2">{business.name}</h1>
                        <p className="text-lg md:text-xl font-inter opacity-90 flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent" />
                            {business.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="flex-grow bg-white py-12 px-6">
                <div className="container mx-auto flex flex-col md:flex-row gap-12">

                    {/* Left: Details */}
                    <div className="w-full md:w-2/3 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">About this Spot</h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-inter">
                                {business.description?.trim() ? business.description : "Experience a productive atmosphere tailored for your needs. This spot offers high-speed internet, comfortable seating, and a community-focused environment perfect for studying, working, or collaborating."}
                            </p>
                        </div>

                        {/* Available Spaces */}
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4 font-poppins">Available Spaces</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {business.spaces && business.spaces.length > 0 ? (
                                    business.spaces.map(space => (
                                        <div key={space.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-gray-800 font-inter">{space.name}</h4>
                                                <p className="text-xs text-gray-500">{space.maxCapacity} seats max</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`font-bold ${space.currentOccupancy >= space.maxCapacity ? 'text-red-500' : 'text-green-600'}`}>
                                                    {space.maxCapacity - space.currentOccupancy} left
                                                </span>
                                                <p className="text-xs text-gray-400">of {space.maxCapacity}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No specific spaces listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Amenities (Placeholder for now) */}
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4 font-poppins">Amenities</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-inter"><FontAwesomeIcon icon={faWifi} /> Free WiFi</span>
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-inter"><FontAwesomeIcon icon={faClock} /> Open Late</span>
                                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-inter"><FontAwesomeIcon icon={faCoffee} /> Coffee Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Card */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 sticky top-24">
                            <div className="text-center mb-6">
                                <span className="block text-gray-500 text-sm mb-1 uppercase tracking-wide font-bold">Current Availability</span>
                                <span className={`text-5xl font-bold font-inter ${business.availabilityPercentage > 70 ? 'text-green-600' :
                                    business.availabilityPercentage > 30 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                    {business.availabilityPercentage}%
                                </span>
                                <p className="text-sm text-gray-400 mt-2">Updated recently</p>
                            </div>

                            <button
                                onClick={() => setShowBookingModal(true)}
                                className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg transform hover:-translate-y-1 mb-4"
                            >
                                Book a Seat
                            </button>
                            <button className="w-full bg-white text-primary border-2 border-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-primary transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
            {showBookingModal && business && (
                <BookingModal business={business} onClose={() => setShowBookingModal(false)} />
            )}
        </div>
    );
};

export default BusinessDetails;
