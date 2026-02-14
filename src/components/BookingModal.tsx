import { useState, useEffect } from 'react';
import type { SubBusiness } from '../utils/dataStore';
import { addBooking } from '../utils/dataStore';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faClock, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface BookingModalProps {
    business: SubBusiness;
    onClose: () => void;
}

const BookingModal = ({ business, onClose }: BookingModalProps) => {
    const { user } = useAuth();
    const [bookingType, setBookingType] = useState<'individual' | 'wholePlace'>('individual');
    const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [estimatedFee, setEstimatedFee] = useState(0);

    // User Info (Pre-filled if logged in)
    const [userName, setUserName] = useState(user?.name || '');
    const [contact, setContact] = useState(user?.email || '');

    // Success State
    const [showSuccess, setShowSuccess] = useState(false);

    // Initialize defaults
    useEffect(() => {
        if (business.spaces && business.spaces.length > 0) {
            setSelectedSpaceId(business.spaces[0].id);
        }
    }, [business]);

    // Construct pricing logic
    useEffect(() => {
        if (bookingType === 'wholePlace') {
            setEstimatedFee(business.pricing?.wholePlace || 10000);
        } else {
            setEstimatedFee(business.pricing?.perHead || 200);
        }
    }, [bookingType, business]);

    const handleBook = () => {
        if (!date || !time || !userName) {
            alert("Please fill in all required fields.");
            return;
        }

        const newBooking = {
            userName,
            contact,
            type: bookingType,
            spaceId: bookingType === 'individual' ? selectedSpaceId : undefined,
            date,
            time,
            estimatedFee,
            status: 'confirmed'
        };

        // Save to store
        addBooking(business.id, newBooking as any);
        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-fade-in-up transform transition-all">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <h2 className="text-3xl font-bold font-poppins mb-2 text-gray-800">Booking Confirmed!</h2>
                    <p className="text-gray-500 mb-8 font-inter">You have successfully booked your spot.</p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3 border border-gray-100 shadow-sm">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500 text-sm font-bold uppercase">Business</span>
                            <span className="font-bold text-gray-800">{business.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500 text-sm font-bold uppercase">Type</span>
                            <span className="font-bold text-gray-800">{bookingType === 'individual' ? 'Individual / Group' : 'Whole Place Event'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500 text-sm font-bold uppercase">When</span>
                            <span className="font-bold text-gray-800">{date} @ {time}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-gray-500 text-sm font-bold uppercase">Total Fee</span>
                            <span className="font-bold text-green-600 text-lg">₱{estimatedFee}</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-primary p-6 flex justify-between items-center text-white shrink-0">
                    <h2 className="text-xl font-bold font-poppins">Book a Spot</h2>
                    <button onClick={onClose} className="hover:text-accent transition-colors bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">

                    {/* Booking Type Toggle */}
                    <div className="flex bg-gray-100 p-1.5 rounded-xl">
                        <button
                            onClick={() => setBookingType('individual')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${bookingType === 'individual' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Individual / Group
                        </button>
                        <button
                            onClick={() => setBookingType('wholePlace')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${bookingType === 'wholePlace' ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Events / Whole Place
                        </button>
                    </div>

                    {/* Space Selection (Only for Individual) */}
                    {bookingType === 'individual' && (
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter text-sm">Select Space</label>
                            {business.spaces && business.spaces.length > 0 ? (
                                <div className="relative">
                                    <select
                                        value={selectedSpaceId}
                                        onChange={(e) => setSelectedSpaceId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent bg-white appearance-none cursor-pointer font-medium text-gray-700"
                                    >
                                        {business.spaces.map(space => (
                                            <option key={space.id} value={space.id} disabled={space.currentOccupancy >= space.maxCapacity}>
                                                {space.name} — {space.maxCapacity - space.currentOccupancy}/{space.maxCapacity} Available
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                        ▼
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-500 text-sm italic"><FontAwesomeIcon icon={faInfoCircle} /> No specific spaces listed. You can still book generally.</p>
                            )}
                        </div>
                    )}

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter text-sm">Date</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 font-inter text-sm">Time</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faClock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="time"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-1 font-inter text-sm">Full Name</label>
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="e.g. Juan dela Cruz"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1 font-inter text-sm">Contact Info</label>
                            <input
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Email or Mobile Number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center shrink-0">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Estimated Fee</p>
                        <p className="text-3xl font-bold text-green-600 font-poppins">₱{estimatedFee}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBook}
                            className="px-8 py-3 rounded-xl bg-accent text-primary font-bold hover:bg-yellow-400 shadow-md transition-all transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingModal;
