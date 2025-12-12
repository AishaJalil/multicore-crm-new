import React, { useEffect, useState } from "react";
import { apiService } from "@/api";
import {
  Plus,
  X,
  Building2,
  Users,
  Target,
  TrendingUp,
  Power,
  Mail,
  User,
} from "lucide-react";

type Tenant = {
  id: number;
  name: string;
  description?: string;
  active: boolean;
  owner?: {
    id: number;
    fullName: string;
    email: string;
  };
  createdAt?: string;
};

export function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiService.getBusinessesAdmin();
      setTenants(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await apiService.createOwner({
        name: formData.ownerName,
        email: formData.ownerEmail,
        password: formData.ownerPassword,
        businessName: formData.name || undefined,
      });
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        ownerName: "",
        ownerEmail: "",
        ownerPassword: "",
      });
      await fetchTenants();
    } catch (err: any) {
      setError(err.message || "Failed to create tenant");
    }
  };

  const toggleTenant = async (tenant: Tenant) => {
    try {
      await apiService.setBusinessStatus(tenant.id, !tenant.active);
      await fetchTenants();
    } catch (err: any) {
      setError(err?.message || "Failed to update tenant status");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600 mt-2">
            Manage all businesses on the platform
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Tenant
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-600">Total Tenants</span>
          </div>
          <div className="text-gray-900">{tenants.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-green-600" />
            <span className="text-gray-600">Active</span>
          </div>
          <div className="text-gray-900">
            {tenants.filter((t) => t.active).length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600">Owners</span>
          </div>
          <div className="text-gray-900">
            {tenants.filter((t) => t.owner).length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span className="text-gray-600">Inactive</span>
          </div>
          <div className="text-gray-900">
            {tenants.filter((t) => !t.active).length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : tenants.length === 0 ? (
          <div className="text-gray-500">No tenants yet.</div>
        ) : (
          tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {tenant.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-gray-900">{tenant.name}</h3>
                    <div className="text-gray-500 text-sm">
                      {tenant.description || "No description"}
                    </div>
                    {tenant.owner && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <User className="w-4 h-4" /> {tenant.owner.fullName}
                        <Mail className="w-4 h-4 ml-2" /> {tenant.owner.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    tenant.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tenant.active ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() => toggleTenant(tenant)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    tenant.active
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {tenant.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Add New Tenant</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Tenant / Business Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Owner Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Owner Email
                  </label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerEmail: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Owner Password
                </label>
                <input
                  type="password"
                  value={formData.ownerPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  minLength={6}
                  required
                />
              </div>
            </form>
            <div className="flex gap-3 justify-end mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
