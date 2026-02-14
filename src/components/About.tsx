import { useState } from 'react';

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Heading - Centered across the whole section */}
                <h2 className="text-[2.5rem] md:text-[3rem] font-bold font-poppins text-primary mb-24 leading-tight text-center">
                    About <span className="text-accent">Us</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 text-left">
                        <div className="space-y-4 text-gray-600 font-inter text-lg leading-relaxed">
                            <p>
                                SPOT is a community-driven ecosystem dedicated to optimizing the way we use local spaces. Our journey began with a simple observation: students and organizations struggle to find reliable places to gather, while many local small and medium enterprises (SMEs) have underutilized spaces that remain hidden from those who need them most.
                            </p>

                            {/* Content: Visible on Mobile if expanded, Always visible on Desktop */}
                            <div className={`${isExpanded ? 'block' : 'hidden'} md:block space-y-4`}>
                                <p>
                                    We bridge this gap by providing real-time visibility into space availability, noise levels, and location data, helping you find your "Spot" without wasting time or energy. By driving foot traffic to local businesses during their off-peak hours, we support the growth of SMEs and foster a more resilient local economy by putting these "hidden gems" on the map.
                                </p>
                                <p>
                                    At SPOT, we believe that the best ideas often come from unexpected places. Our platform is built on the values of community, sustainability, and accessibility, ensuring that everyone has the opportunity to connect, collaborate, and create in spaces that inspire them.
                                </p>
                            </div>
                        </div>

                        {/* Read More Button (Mobile Only) */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="md:hidden mt-4 text-primary font-bold font-poppins hover:text-accent transition-colors"
                        >
                            {isExpanded ? 'See Less' : 'Read More'}
                        </button>
                    </div>

                    {/* Image/Visual Placeholder */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gray-100 rounded-full flex items-center justify-center blob-anim overflow-hidden">
                            <span className="text-9xl">📍</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
