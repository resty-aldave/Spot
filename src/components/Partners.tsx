import { Link } from 'react-router-dom';

const Partners = () => {
    return (
        <section id="partners" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Left Side: Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] w-full transform hover:scale-[1.02] transition-transform duration-500">
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Partner with SPOT"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="space-y-8">
                    <h2 className="text-[2rem] md:text-[3rem] font-bold font-poppins text-primary leading-tight">
                        Be One of Our <span className="text-accent underline decoration-wavy decoration-2 underline-offset-8">Partners</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-inter leading-relaxed">
                        Join our network of premium workspaces and cafes. Increase your visibility, attract more customers, and manage your bookings effortlessly with SPOT. We help you fill your empty seats and grow your business by connecting you with professionals looking for the perfect spot.
                    </p>
                    <div className="pt-4">
                        <Link to="/register">
                            <button className="bg-accent text-primary font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-yellow-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-inter text-lg">
                                Register Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
