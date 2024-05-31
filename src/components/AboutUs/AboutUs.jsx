import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../Context';
import { Link } from 'react-router-dom';

const About = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'}>
            {/* Hero Section */}
            <section
                className="bg-cover bg-center h-screen flex items-center justify-center"
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?About,office')" }}
            >
                <div className={`p-10 rounded-lg text-center ${theme === 'light' ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'}`}>
                    <h1 className={`text-5xl font-bold mb-4 ${theme === "dark" ? 'dark-text' : 'dark-text'}`}>{theme === 'light' ? 'About Us' : 'About Us'}</h1>
                    <p className={`text-xl ${theme === "dark" ? 'dark-text' : 'dark-text'}`}>{theme === 'light' ? "We'd love to hear from you!" : "We'd love to hear from you!"}</p>
                </div>
            </section>

            {/* About Form & Info */}
            <section className={theme === 'light' ? 'py-20 bg-white' : 'py-20 bg-gray-800'}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* About Form */}
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                            <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                Fill out the form below and we will get back to you as soon as possible.
                            </p>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={`block text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full p-3 border rounded-lg ${theme === 'light' ? 'border-gray-300' : 'border-gray-600 bg-gray-700 text-gray-300'}`}
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={`block text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full p-3 border rounded-lg ${theme === 'light' ? 'border-gray-300' : 'border-gray-600 bg-gray-700 text-gray-300'}`}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className={`block text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        className={`w-full p-3 border rounded-lg ${theme === 'light' ? 'border-gray-300' : 'border-gray-600 bg-gray-700 text-gray-300'}`}
                                        rows="5"
                                        placeholder="Your Message"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* About Information */}
                        <div>
                            <h2 className="text-4xl font-bold mb-4">About Information</h2>
                            <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                Reach out to us through any of the following methods:
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <i className="fas fa-phone-alt text-primary text-2xl mr-4"></i>
                                    <div>
                                        <h3 className="text-xl font-semibold">Phone</h3>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>+1 (123) 456-7890</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-envelope text-primary text-2xl mr-4"></i>
                                    <div>
                                        <h3 className="text-xl font-semibold">Email</h3>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>support@electronics-shop.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt text-primary text-2xl mr-4"></i>
                                    <div>
                                        <h3 className="text-xl font-semibold">Address</h3>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>123 Electronics St, Tech City, CA 98765</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps */}
            <section className="h-96">
                <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.7637230474337!2d76.94617761507424!3d43.238949479137236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836918406b2d3b%3A0xe0a8d16a54d01f87!2sAlmaty%2C%20Kazakhstan!5e0!3m2!1sen!2s!4v1629074804795!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </section>

            {/* Customer Support */}
            <section className={theme === 'light' ? 'py-20 bg-gray-200' : 'py-20 bg-gray-800'}>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Customer Support</h2>
                    <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Our support team is here to help you with any issues or questions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {supportOptions.map(option => (
                            <div key={option.id} className={`p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
                                <i className={`${option.icon} text-primary text-4xl mb-4`}></i>
                                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>{option.description}</p>
                                <Link to="/catalog">
                                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">Learn More</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const supportOptions = [
    {
        id: 1,
        title: 'Technical Support',
        description: 'Get help with technical issues and product troubleshooting.',
        icon: 'fas fa-tools',
    },
    {
        id: 2,
        title: 'Order Support',
        description: 'Assistance with orders, shipping, and returns.',
        icon: 'fas fa-shopping-cart',
    },
    {
        id: 3,
        title: 'Billing Support',
        description: 'Questions about billing, payments, and invoices.',
        icon: 'fas fa-file-invoice-dollar',
    },
];

export default About;
