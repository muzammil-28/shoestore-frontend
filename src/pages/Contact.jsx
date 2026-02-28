import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react';
function Contact() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleForm = async (sub) => {
        sub.preventDefault();
        const mailRes = await fetch(
            `https://shoesstore.infinityfreeapp.com/shoestore-backend/api/php-mailing/contact-mail.php`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    subject: subject,
                    description: description
                })
            }
        );
        const mailData = await mailRes.json();
        if (mailData.status) {
            setMessage(mailData.message);
            setTimeout(() => {
                setMessage("");
            },3000);
            setFullName("");
            setEmail("");
            setSubject("");
            setDescription("");
        } else {
            setMessage(mailData.message);
            setTimeout(() => {
                setMessage("");
            },1000);
        }
    }
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Page Heading */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
                            Contact Us
                        </h1>
                        <p className="text-gray-600 mt-2">
                            We are here to help you. Feel free to contact us anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-blue-600">
                                Get In Touch
                            </h2>

                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">+92 300 0000000</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">support@shoestore.com</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">
                                    Rawalpindi, Pakistan
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Support Time</p>
                                <p className="font-medium">Mon – Fri (10AM – 8PM)</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                            {message && (
                                <p className="text-green-600 text-center font-semibold mb-4">
                                    {message}
                                </p>
                            )}
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleForm} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>

                                <input
                                    type="submit"
                                    value="Send Message"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold cursor-pointer"
                                />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;