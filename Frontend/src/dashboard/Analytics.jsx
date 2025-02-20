import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Analytics = () => {
  // Dummy Sales Data
  const weeklySales = [
    { day: "Mon", sales: 120 },
    { day: "Tue", sales: 150 },
    { day: "Wed", sales: 80 },
    { day: "Thu", sales: 200 },
    { day: "Fri", sales: 180 },
    { day: "Sat", sales: 220 },
    { day: "Sun", sales: 140 },
  ];

  // Dummy Transaction Data
  const transactions = [
    { id: 1, product: "Tomatoes", quantity: 10, price: 2.5, total: 25, date: "2025-02-01" },
    { id: 2, product: "Potatoes", quantity: 5, price: 1.8, total: 9, date: "2025-02-02" },
    { id: 3, product: "Eggs", quantity: 12, price: 0.5, total: 6, date: "2025-02-03" },
  ];

  // Total Sales Calculation
  const totalSales = transactions.reduce((acc, t) => acc + t.total, 0);
  const totalOrders = transactions.length;
  const bestSelling = transactions.reduce((top, t) => (t.quantity > (top.quantity || 0) ? t : top), {}).product || "N/A";

  return (
    <div className="bg-gray-100 min-h-screen pb-16 md:pb-0">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-6">Analytics & Reports</h2>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-xl md:text-2xl font-bold">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-xl md:text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Best Seller</h3>
          <p className="text-xl md:text-2xl font-bold">{bestSelling}</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg text-center font-semibold mb-4">Weekly Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg text-center font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-sm md:text-base">Product</th>
                <th className="border p-2 text-sm md:text-base">Quantity</th>
                <th className="border p-2 text-sm md:text-base">Price</th>
                <th className="border p-2 text-sm md:text-base">Total</th>
                <th className="border p-2 text-sm md:text-base">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="text-center">
                  <td className="border p-2 text-sm md:text-base">{t.product}</td>
                  <td className="border p-2 text-sm md:text-base">{t.quantity}</td>
                  <td className="border p-2 text-sm md:text-base">${t.price}</td>
                  <td className="border p-2 text-sm md:text-base font-bold">${t.total}</td>
                  <td className="border p-2 text-sm md:text-base">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;