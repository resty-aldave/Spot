import { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../data/db.json'; // Importing data directly

// Define Business interface
interface Business {
    id: string | number;
    name: string;
    location: string;
    availabilityPercentage: number;
    image: string;
}

const Businesses = () => {
    // Use data from JSON file directly
    // Ensure we handle the structure correctly (db.businesses)
    const [businesses] = useState<Business[]>(db.businesses as Business[]);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic
    const filteredBusinesses = businesses.filter(business => {
        const term = searchTerm.toLowerCase();
        const name = business.name ? business.name.toLowerCase() : '';
        const location = business.location ? business.location.toLowerCase() : '';
        return name.includes(term) || location.includes(term);
    });

    return (
        <section id="businesses" className="py-24 md:py-32 bg-gray-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[2rem] md:text-[3rem] font-bold font-poppins text-primary mb-6">Find a SPOT</h2>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative cursor-text">
                        <input
                            type="text"
                            placeholder="Search for a location or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent shadow-md font-inter transition-all"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-accent p-2 rounded-full text-primary hover:bg-yellow-400 transition-colors pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Results */}
                {filteredBusinesses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
                        {filteredBusinesses.slice(0, 3).map((business) => (
                            <Link to={`/business/${business.id}`} key={business.id} className="block group h-full">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full transform group-hover:-translate-y-1 transition-transform">
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={business.image} alt={business.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    {/* Redesigned Card Content */}
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
                    <div className="text-center mb-16">
                        <p className="text-xl text-gray-500 font-inter">
                            {businesses.length === 0 ? "0 businesses loaded." : `"${searchTerm}" not found.`}
                        </p>
                    </div>
                )}

                <div className="text-center">
                    <Link to="/businesses" className="inline-block bg-white text-primary font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 font-poppins group">
                        <span className="group-hover:text-white transition-colors">View All Businesses</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Businesses;
