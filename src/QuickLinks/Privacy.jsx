import React from 'react';

const Privacy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4 sm:p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 max-w-3xl w-full text-left transition-transform duration-500 hover:scale-105">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 sm:mb-8 text-center">
          Privacy Policy
        </h1>
        
        <ul className="list-disc pl-5 space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
          <li><strong className="text-blue-500">Information We Collect:</strong> We collect personal details like name, phone number, email, address, and payment information for order processing.</li>
          <li><strong className="text-blue-500">How We Use Your Information:</strong> To process orders, improve our services, communicate updates, and offer customer support.</li>
          <li><strong className="text-blue-500">Sharing of Information:</strong> We only share necessary information with trusted partners involved in fulfilling your orders.</li>
          <li><strong className="text-blue-500">Data Security:</strong> Your data is protected with encryption and industry-standard security measures.</li>
          <li><strong className="text-blue-500">Cookies:</strong> We use cookies to personalize your shopping experience and to remember your preferences.</li>
          <li><strong className="text-blue-500">Your Rights:</strong> You can request access, updates, or deletion of your data by contacting us directly.</li>
          <li><strong className="text-blue-500">Policy Updates:</strong> We may update our privacy practices, and any changes will be posted on this page.</li>
        </ul>

      </div>
    </section>
  );
};

export default Privacy;
