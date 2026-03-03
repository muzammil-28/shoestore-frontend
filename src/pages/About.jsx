import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
function About() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
                            About Us
                        </h1>
                        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                            Welcome to ShoeStore. Your trusted destination for quality footwear.
                        </p>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-lg shadow p-6 md:p-10 mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            ShoeStore is an online footwear platform providing stylish, comfortable,
                            and affordable shoes for men, women. Our goal is to deliver
                            high-quality products with excellent customer service.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                        {/* Mission */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide high-quality footwear that combines comfort, durability,
                                and modern design at affordable prices.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become a leading footwear brand in Pakistan by delivering trust,
                                innovation, and customer satisfaction.
                            </p>
                        </div>

                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-white rounded-lg shadow p-6 md:p-10 mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Why Choose Us?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="text-center p-4 border rounded">
                                <h4 className="font-semibold text-lg mb-2">
                                    Quality Products
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Premium quality shoes made with care and attention to detail.
                                </p>
                            </div>

                            <div className="text-center p-4 border rounded">
                                <h4 className="font-semibold text-lg mb-2">
                                    Affordable Prices
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Best prices without compromising on quality.
                                </p>
                            </div>

                            <div className="text-center p-4 border rounded">
                                <h4 className="font-semibold text-lg mb-2">
                                    Fast Delivery
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Quick and reliable delivery all over Pakistan.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-blue-500 text-white rounded-lg shadow p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-3">
                            Ready to Shop With Us?
                        </h2>
                        <p className="mb-6">
                            Explore our latest collection and find your perfect pair today.
                        </p>
                        <button
                            type="button"
                            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate(`/home`)}
                        >
                            Shop Now
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;