import React from "react";

export function Subscriptions() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-gray-600 mt-2">
          Manage plans, billing, and invoices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Starter</h2>
          <p className="text-gray-600 mb-4">For small teams getting started</p>
          <div className="text-2xl font-bold mb-4">
            $19<span className="text-gray-500 text-base">/mo</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>Up to 3 users</li>
            <li>Basic CRM features</li>
            <li>Email support</li>
          </ul>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Choose Plan
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Growth</h2>
          <p className="text-gray-600 mb-4">For growing businesses</p>
          <div className="text-2xl font-bold mb-4">
            $49<span className="text-gray-500 text-base">/mo</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-2 mb4">
            <li>Up to 20 users</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Choose Plan
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Enterprise
          </h2>
          <p className="text-gray-600 mb-4">For large organizations</p>
          <div className="text-2xl font-bold mb-4">Custom</div>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>Unlimited users</li>
            <li>Custom SLAs</li>
            <li>Dedicated support</li>
          </ul>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Contact Sales
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Billing History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Invoice</th>
                <th className="text-left py-3 px-4 text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-4">INV-00{i}</td>
                  <td className="py-3 px-4">2025-12-01</td>
                  <td className="py-3 px-4">$49.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
