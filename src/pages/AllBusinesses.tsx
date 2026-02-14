import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import db from '../data/db.json';

interface Business {
    id: string | number;
    name: string;
    location: string;
    availabilityPercentage: number;
    image: string;
}

const AllBusinesses = () => {
    // Load data directly
    const [businesses] = useState<Business[]>(db.businesses as Business[]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter logic
    const filteredBusinesses = businesses.filter(business => {
        const term = searchTerm.toLowerCase();
        const name = business.name ? business.name.toLowerCase() : '';
        const location = business.location ? business.location.toLowerCase() : '';
        return name.includes(term) || location.includes(term);
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <section className="bg-primary pt-32 pb-16 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">All <span className="text-accent">Spots</span></h1>
                    <p className="text-gray-300 font-inter text-lg max-w-2xl mx-auto mb-8">
                        Browse our complete network of study hubs, coworking spaces, and cafes. Find the perfect environment for your productivity.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 text-lg rounded-full border-none focus:outline-none focus:ring-2 focus:ring-accent shadow-xl font-inter"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-accent p-2 rounded-full text-primary hover:bg-yellow-400 transition-colors pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <main className="flex-grow bg-gray-50 py-16 px-6">
                <div className="container mx-auto">
                    {filteredBusinesses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {filteredBusinesses.map((business) => (
                                <Link to={`/business/${business.id}`} key={business.id} className="block group h-full">
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full transform group-hover:-translate-y-1 transition-transform">
                                        <div className="h-56 overflow-hidden relative">
                                            <img src={business.image} alt={business.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                        </div>

                                        {/* Card Content (Matches Home) */}
                                        <div className="p-6 flex-grow flex justify-between items-stretch">
                                            {/* Left Column: Name & Location */}
                                            <div className="flex flex-col justify-between pr-4 items-start text-left">
                                                <h3 className="text-[1rem] font-bold font-poppins text-[#0F172A] leading-tight group-hover:text-accent transition-colors">
                                                    {business.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-inter mt-auto pt-4 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="line-clamp-1">{business.location}</span>
                                                </p>
                                            </div>

                                            {/* Right Column: Availability % */}
                                            <div className="flex flex-col justify-end items-end pl-4 border-l border-gray-100 min-w-[30%]">
                                                <span className={`text-[2rem] font-bold font-inter leading-none ${business.availabilityPercentage > 70 ? 'text-green-600' :
                                                        business.availabilityPercentage > 30 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                    {business.availabilityPercentage}%
                                                </span>
                                                <span className="text-[0.65rem] text-gray-400 uppercase tracking-wider font-bold mt-1">Avail</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-400 font-poppins">No spots found matching "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-accent hover:underline font-bold">Clear Search</button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllBusinesses;
