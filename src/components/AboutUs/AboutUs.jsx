import React, { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        function initMap() {
            const myLatLng = { lat: 37.7749, lng: -122.4194 };

            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 15,
            });

            new window.google.maps.Marker({
                position: myLatLng,
                map,
                title: 'Our Location',
            });
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBWRVK4hhYTAuNykDpuHXcNReguKBgQTQI&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="bg-gray-100">
            <header className="bg-blue-500 text-white text-center py-4">
                <h1 className="text-2xl font-bold">About Our Company</h1>
            </header>

            <section className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                <p className="text-gray-700">
                    We are a passionate team dedicated to providing high-quality products and exceptional customer service. Our mission is to make technology accessible and enjoyable for everyone.
                </p>
            </section>

            <section className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Customer Satisfaction</li>
                    <li>Innovation</li>
                    <li>Integrity</li>
                    <li>Community Engagement</li>
                </ul>
            </section>

            <section className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">You Can Find Us</h2>
                <div id="map" className="h-64"></div>
            </section>
        </div>
    );
};

export default AboutUs;