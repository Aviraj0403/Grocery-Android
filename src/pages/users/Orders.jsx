import React from 'react';

const orders = [
  { id: 1, item: 'Apples', date: '2025-04-25', amount: '₹150' },
  { id: 2, item: 'Milk', date: '2025-04-24', amount: '₹50' },
  { id: 3, item: 'Bread', date: '2025-04-23', amount: '₹40' },
];

const Orders = () => (
  <section>
    <h2 className="text-2xl font-semibold text-green-600 mb-4">My Orders</h2>
    <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto bg-gradient-to-r from-green-100 to-yellow-100">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left rounded-tl-2xl">#</th>
            <th className="px-4 py-3 text-left">Item</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left rounded-tr-2xl">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-green-100">
              <td className="px-4 py-4 font-semibold">{order.id}</td>
              <td className="px-4 py-4">{order.item}</td>
              <td className="px-4 py-4">{order.date}</td>
              <td className="px-4 py-4 font-semibold">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Orders;
