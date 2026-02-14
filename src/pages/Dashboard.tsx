import { useState, useEffect, type FormEvent } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getBusinesses, saveBusinessUpdate, addSpace, updateSpaceOccupancy, deleteSpace, type SubBusiness } from '../utils/dataStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faChartLine, faChair, faCog, faUsers, faMinus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [business, setBusiness] = useState<SubBusiness | null>(null);
    const [loading, setLoading] = useState(true);

    // Add Space Modal State
    const [showAddSpace, setShowAddSpace] = useState(false);
    const [newSpaceName, setNewSpaceName] = useState('');
    const [newSpaceCapacity, setNewSpaceCapacity] = useState(1);

    // Settings Modal State
    const [showSettings, setShowSettings] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPerHead, setEditPerHead] = useState(0);
    const [editWholePlace, setEditWholePlace] = useState(0);

    useEffect(() => {
        if (!user || user.role !== 'business') {
            navigate('/login');
            return;
        }

        const loadData = () => {
            const businesses = getBusinesses();
            const myBusiness = businesses.find((b) => b.email === user.email);
            if (myBusiness) {
                setBusiness(myBusiness);
                setEditName(myBusiness.name);
                setEditPerHead(myBusiness.pricing?.perHead || 0);
                setEditWholePlace(myBusiness.pricing?.wholePlace || 0);
            }
            setLoading(false);
        };

        loadData();
        // Set up a simple poll to keep UI in sync if multiple tabs open (optional, but good for demo)
        const interval = setInterval(loadData, 2000);
        return () => clearInterval(interval);

    }, [user, navigate]);

    // Update form when business data changes (e.g. from polling)
    useEffect(() => {
        if (business && !showSettings) {
            setEditName(business.name);
            setEditPerHead(business.pricing?.perHead || 0);
            setEditWholePlace(business.pricing?.wholePlace || 0);
        }
    }, [business, showSettings]);


    const handleAddSpace = (e: FormEvent) => {
        e.preventDefault();
        if (business && newSpaceName) {
            addSpace(business.id, {
                name: newSpaceName,
                maxCapacity: newSpaceCapacity,
                currentOccupancy: 0
            });
            setShowAddSpace(false);
            setNewSpaceName('');
            setNewSpaceCapacity(1);
            // Data refresh happens via poll or we can manually trigger re-fetch logic here
            const businesses = getBusinesses();
            const updated = businesses.find(b => b.id.toString() === business.id.toString());
            if (updated) setBusiness(updated);
        }
    };

    const handleUpdateOccupancy = (spaceId: string, delta: number) => {
        if (business) {
            updateSpaceOccupancy(business.id, spaceId, delta);
            // Optimistic update for immediate UI feedback
            const businesses = getBusinesses();
            const updated = businesses.find(b => b.id.toString() === business.id.toString());
            if (updated) setBusiness(updated);
        }
    };

    const handleDeleteSpace = (spaceId: string) => {
        if (business && confirm("Are you sure you want to delete this space?")) {
            deleteSpace(business.id, spaceId);
            const businesses = getBusinesses();
            const updated = businesses.find(b => b.id.toString() === business.id.toString());
            if (updated) setBusiness(updated);
        }
    };

    const handleSaveSettings = (e: FormEvent) => {
        e.preventDefault();
        if (business) {
            const updatedBusiness = {
                ...business,
                name: editName,
                pricing: {
                    perHead: editPerHead,
                    wholePlace: editWholePlace
                }
            };
            saveBusinessUpdate(updatedBusiness);
            setBusiness(updatedBusiness);
            setShowSettings(false);
            alert("Settings Saved!");
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center">Loading Dashboard...</div>;
    if (!business) return <div className="flex h-screen items-center justify-center">Business Data Not Found</div>;

    // Calculate Stats
    const totalBookings = business.bookings ? business.bookings.length : 0;
    const totalCapacity = business.spaces ? business.spaces.reduce((acc, s) => acc + s.maxCapacity, 0) : 0;
    const totalOccupancy = business.spaces ? business.spaces.reduce((acc, s) => acc + s.currentOccupancy, 0) : 0;
    const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex-grow pt-24 px-6 container mx-auto pb-20">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary font-poppins">{business.name} Dashboard</h1>
                        <p className="text-gray-500 font-inter">Manage your spot, bookings, and spaces.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowSettings(true)} className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-bold shadow-sm">
                            <FontAwesomeIcon icon={faCog} /> Settings
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Monthly Bookings</p>
                            <p className="text-3xl font-bold text-gray-800">{totalBookings}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Current Occupancy</p>
                            <p className="text-3xl font-bold text-gray-800">{occupancyRate}%</p>
                            <p className="text-xs text-gray-400">{totalOccupancy} / {totalCapacity} seats filled</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl">
                            <FontAwesomeIcon icon={faChair} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Total Spaces</p>
                            <p className="text-3xl font-bold text-gray-800">{business.spaces?.length || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Spaces Management */}
                <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-xl font-bold text-primary font-poppins">Manage Spaces</h2>
                        <button
                            onClick={() => setShowAddSpace(true)}
                            className="bg-accent text-primary px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-sm flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add Space
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {business.spaces && business.spaces.length > 0 ? (
                            business.spaces.map(space => (
                                <div key={space.id} className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors group">
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="font-bold text-lg text-gray-800 font-inter">{space.name}</h3>
                                        <p className="text-sm text-gray-500">Max Capacity: {space.maxCapacity}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {/* Occupancy Control */}
                                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
                                            <button
                                                onClick={() => handleUpdateOccupancy(space.id, -1)}
                                                disabled={space.currentOccupancy <= 0}
                                                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-30"
                                            >
                                                <FontAwesomeIcon icon={faMinus} size="sm" />
                                            </button>

                                            <span className="font-bold w-6 text-center">{space.currentOccupancy}</span>

                                            <button
                                                onClick={() => handleUpdateOccupancy(space.id, 1)}
                                                disabled={space.currentOccupancy >= space.maxCapacity}
                                                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors disabled:opacity-30"
                                            >
                                                <FontAwesomeIcon icon={faPlus} size="sm" />
                                            </button>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteSpace(space.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                            title="Delete Space"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-400">
                                <FontAwesomeIcon icon={faChair} size="3x" className="mb-4 opacity-20" />
                                <p>No spaces added yet. Add your first space to get started!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <Footer />

            {/* Add Space Modal */}
            {showAddSpace && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4 font-poppins">Add New Space</h3>
                        <form onSubmit={handleAddSpace} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 text-sm font-inter">Space Name (e.g. Table 1)</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
                                    value={newSpaceName}
                                    onChange={e => setNewSpaceName(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 text-sm font-inter">Max Capacity</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
                                    value={newSpaceCapacity}
                                    onChange={e => setNewSpaceCapacity(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            <div className="flex gap-3 justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddSpace(false)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-accent text-primary rounded-lg font-bold hover:bg-yellow-400 shadow-md"
                                >
                                    Add Space
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4 font-poppins">Edit Business Settings</h3>
                        <form onSubmit={handleSaveSettings} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 text-sm font-inter">Business Name</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm font-inter">Per Head Price (₱)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
                                        value={editPerHead}
                                        onChange={e => setEditPerHead(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm font-inter">Whole Place (₱)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
                                        value={editWholePlace}
                                        onChange={e => setEditWholePlace(Number(e.target.value))}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowSettings(false)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-gray-700 rounded-lg font-bold hover:bg-slate-700 shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
