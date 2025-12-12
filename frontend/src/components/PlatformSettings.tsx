import React from "react";

export function PlatformSettings() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure global preferences and defaults
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Branding</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 mb-1">Platform Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Multicore CRM"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Primary Color</label>
              <input
                type="color"
                className="w-16 h-10 p-0 border border-gray-300 rounded"
                defaultValue="#4f46e5"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Email notifications enabled</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span>Weekly summary reports</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="rounded" />
            <span>Require 2FA for admins</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" />
            <span>Lock accounts after 5 failed logins</span>
          </label>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
