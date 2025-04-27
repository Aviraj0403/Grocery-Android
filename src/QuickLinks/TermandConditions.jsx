import React from "react";

const TermandConditions = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 p-4 sm:p-6 from-green-100 to-yellow-100">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 max-w-3xl w-full text-left transition-transform duration-500 hover:scale-105">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-6 sm:mb-8 text-center text-green-500">
          Terms & Conditions
        </h1>
        
        <ul className="list-disc pl-5 space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
          <li>
            <strong className="text-green-500">Return Policy:</strong> Items must be returned within <strong>24 hours</strong> of delivery, unused and in original packaging. No returns will be accepted after 24 hours.
          </li>
          <li>
            <strong className="text-green-500">Refunds:</strong> Refunds are processed within <strong>2-4 business hours</strong> to the original payment method after inspection.
          </li>
          <li>
            <strong className="text-green-500">Order Cancellation:</strong> Orders can be canceled within <strong>1 hour</strong> of placement only.
          </li>
          <li>
            <strong className="text-green-500">Damaged or Wrong Product:</strong> Notify us within <strong>24 hours</strong> with photo proof if you receive a damaged or incorrect item.
          </li>
          <li>
            <strong className="text-green-500">Customer Responsibility:</strong> Please ensure your shipping information is accurate. We are not responsible for incorrect addresses.
          </li>
          <li>
            <strong className="text-green-500">Service Availability:</strong> Our support team is available <strong>24/7</strong> for your assistance.
          </li>
        </ul>

      </div>
    </section>
  );
};

export default TermandConditions;
