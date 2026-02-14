import { useState, useEffect } from 'react';

const images = [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Office
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Meeting
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Cafe
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="min-h-[100vh] flex items-center pt-20 md:pt-0 bg-transparent"> {/* Changed bg to transparent to show global blobs */}
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                {/* Left Side: Text */}
                <div className="space-y-6 flex flex-col justify-center h-full order-2 md:order-1">
                    <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold font-poppins text-primary leading-tight text-center md:text-left">
                        Welcome to <span className="text-accent">SPOT</span>
                    </h1>
                    <p className="text-[1rem] md:text-[1.125rem] text-gray-600 font-inter max-w-lg leading-relaxed text-center md:text-left mx-auto md:mx-0">
                        SPOT is your real-time compass for finding the perfect, available space to meet, work, or grow your business without the frustration of crowded venues. We seamlessly connect students and organizations with underutilized local cafes and hubs, turning hidden gems into productive community centers. By optimizing urban spaces and eliminating wasted travel time, we empower you to make smarter, more sustainable choices every day.
                    </p>
                    {/* Button removed as requested */}
                </div>

                {/* Right Side: Image Slider */}
                <div className="relative h-[40vh] md:h-[50vh] w-full rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}

                    {/* Slider Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-accent' : 'bg-white/50 hover:bg-white'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
