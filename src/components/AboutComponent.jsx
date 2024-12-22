import React from "react";
import { Link } from "react-router-dom";

const AboutComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            We are passionate about creating amazing content and providing value
            to our users through innovative solutions.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To inspire, educate, and empower individuals through high-quality
              content and exceptional user experiences. We strive to be a trusted
              source of information and innovation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a platform that connects people and ideas, fostering a
              community where creativity and innovation thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            Our dedicated team works tirelessly to bring you the best content and
            services. Get to know the people behind our success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member */}
            {["John Doe", "Jane Smith", "Alex Johnson"].map((name, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <img
                  src={`https://via.placeholder.com/150?text=${name}`}
                  alt={name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-lg max-w-xl mx-auto mb-6">
            Explore our platform and discover how we can help you achieve your
            goals. Your journey starts here.
          </p>
          <Link to={'/contact'} className="bg-white text-blue-600 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;
