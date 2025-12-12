import { useState, useEffect } from "react";
import { useCRM } from "./CRMContext";
import {
  Building2,
  Users,
  Plus,
  UserPlus,
  Settings,
  Target,
  Calendar,
  TrendingUp,
  Ticket,
  DollarSign,
  Activity,
} from "lucide-react";
import { apiFetch } from "@/api/client";

interface StaffMember {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
}

export function OwnerDashboard() {
  const { currentUser, customers, switchView } = useCRM();
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);
  const [showCreateStaff, setShowCreateStaff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [businessFormError, setBusinessFormError] = useState("");
  const [staffFormError, setStaffFormError] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Business form state
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessTimezone, setBusinessTimezone] = useState("");

  // Staff form state
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffRole, setStaffRole] = useState<
    "SALES_MANAGER" | "SALES_AGENT" | "SUPPORT_MANAGER" | "SUPPORT_AGENT"
  >("SALES_AGENT");

  // Fetch business ID and staff list
  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  const fetchBusinessInfo = async () => {
    try {
      const meResponse = await apiFetch<any>("/api/auth/me", { auth: true });
      const bid = meResponse.businessId;
      setBusinessId(bid);

      if (bid) {
        // Business profile
        apiFetch<any>("/api/owner/business/profile", { auth: true })
          .then(setBusinessProfile)
          .catch(() => {});
        // Staff list
        apiFetch<StaffMember[]>(`/api/owner/business/${bid}/staff`, {
          auth: true,
        })
          .then(setStaffList)
          .catch(() => setStaffList([]));
        // Leads
        apiFetch<any[]>(`/api/leads/business/${bid}`, { auth: true })
          .then(setLeads)
          .catch(() => setLeads([]));
        // Deals
        apiFetch<any[]>(`/api/business/${bid}/deals`, { auth: true })
          .then(setDeals)
          .catch(() => setDeals([]));
        // Products
        apiFetch<any[]>(`/api/business/${bid}/products`, { auth: true })
          .then(setProducts)
          .catch(() => setProducts([]));
        // Tickets
        apiFetch<any>(`/api/tickets/business/${bid}?page=0&size=50`, {
          auth: true,
        })
          .then((resp) => {
            if (Array.isArray(resp)) setTickets(resp);
            else if (resp && Array.isArray(resp.content))
              setTickets(resp.content);
            else setTickets([]);
          })
          .catch(() => setTickets([]));
        // Appointments by business
        apiFetch<any>(`/api/appointments/business/${bid}`, { auth: true })
          .then((resp) => {
            if (Array.isArray(resp)) setAppointments(resp);
            else if (resp && Array.isArray(resp.content))
              setAppointments(resp.content);
            else setAppointments([]);
          })
          .catch(() => setAppointments([]));
        // Audit logs (paged)
        apiFetch<{ content: any[] }>(
          `/api/audit/business/${bid}?page=0&size=20`,
          { auth: true }
        )
          .then((resp) => setAuditLogs(resp.content || []))
          .catch(() => setAuditLogs([]));
      }
    } catch (err: any) {
      console.warn("Failed to fetch business info:", err);
    }
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBusinessFormError("");
    setSuccess("");

    try {
      const response = await apiFetch<any>("/api/owner/business", {
        method: "POST",
        body: JSON.stringify({
          name: businessName,
          address: businessAddress,
          phone: businessPhone,
          timezone: businessTimezone,
        }),
        auth: true,
      });

      setSuccess(`Business "${businessName}" created successfully!`);
      setBusinessName("");
      setBusinessAddress("");
      setBusinessPhone("");
      setBusinessTimezone("");
      setShowCreateBusiness(false);
      setBusinessFormError("");
      await fetchBusinessInfo();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setBusinessFormError(err.message || "Failed to create business");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStaffFormError("");
    setSuccess("");

    if (!businessId) {
      setStaffFormError(
        "Business ID not found. Please create or complete your business profile first."
      );
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch<any>(
        `/api/owner/business/${businessId}/staff`,
        {
          method: "POST",
          body: JSON.stringify({
            name: staffName,
            email: staffEmail,
            password: staffPassword,
            phone: staffPhone || "",
            role: staffRole,
          }),
          auth: true,
        }
      );

      setSuccess(
        `Staff member "${staffName}" created successfully with role ${staffRole}!`
      );
      setStaffName("");
      setStaffEmail("");
      setStaffPassword("");
      setStaffPhone("");
      setShowCreateStaff(false);
      setStaffFormError("");
      await fetchBusinessInfo();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setStaffFormError(err.message || "Failed to create staff member");
    } finally {
      setLoading(false);
    }
  };

  // Calculate KPIs from real data
  const openLeads = leads.filter(
    (l: any) => !["won", "lost"].includes((l.status || "").toLowerCase())
  ).length;
  const pipelineValue = leads
    .filter(
      (l: any) => !["won", "lost"].includes((l.status || "").toLowerCase())
    )
    .reduce((sum, l: any) => sum + (l.value || 0), 0);
  const openTickets = tickets.filter(
    (t: any) => t.status === "open" || t.status === "in_progress"
  ).length;
  const activeCustomers = customers.filter(
    (c) => (c as any).status === "active" || !(c as any).status
  ).length;

  const recentActivity = auditLogs;

  const StatCard = ({
    icon: Icon,
    label,
    value,
    subValue,
    color,
  }: {
    icon: any;
    label: string;
    value: string | number;
    subValue?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {subValue && (
          <span className="text-green-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {subValue}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Business Owner Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {currentUser?.name}
          </p>
        </div>
        {businessProfile && (
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="text-sm text-gray-500">Business</div>
            <div className="text-gray-900 font-semibold">
              {businessProfile.name}
            </div>
            <div className="text-gray-600 text-sm">
              {(businessProfile.address || "").toString()}{" "}
              {businessProfile.phone ? `• ${businessProfile.phone}` : ""}
            </div>
          </div>
        )}
      </div>

      {/* Duplicate overview sections removed; navigate via sidebar pages instead */}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Company KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Target}
          label="Open Leads"
          value={openLeads}
          subValue="+8%"
          color="bg-orange-600"
        />
        <StatCard
          icon={DollarSign}
          label="Pipeline Value"
          value={`$${pipelineValue.toLocaleString()}`}
          subValue="+12%"
          color="bg-green-600"
        />
        <StatCard
          icon={Ticket}
          label="Open Tickets"
          value={openTickets}
          color="bg-red-600"
        />
        <StatCard
          icon={Users}
          label="Active Customers"
          value={activeCustomers}
          subValue="+5%"
          color="bg-blue-600"
        />
      </div>

      {/* Quick Actions removed; use sidebar for navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Staff List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Staff List
              </h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            {staffList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No staff members yet</p>
                <p className="text-xs mt-1">Create your first staff member</p>
              </div>
            ) : (
              <div className="space-y-2">
                {staffList.map((staff) => (
                  <div
                    key={staff.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-gray-900 font-medium">
                        {staff.fullName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {staff.email} • {staff.role}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        staff.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No recent activity yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2" />
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">
                        {activity.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {activity.timestamp
                          ? new Date(activity.timestamp).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Business Modal */}
      {showCreateBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create Business Profile
            </h2>
            <form onSubmit={handleCreateBusiness} className="space-y-4">
              {businessFormError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {businessFormError}
                </div>
              )}
              <div>
                <label className="block text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Timezone</label>
                <input
                  type="text"
                  value={businessTimezone}
                  onChange={(e) => setBusinessTimezone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., America/New_York"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Business"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateBusiness(false);
                    setError("");
                    setSuccess("");
                    setBusinessFormError("");
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Staff Modal */}
      {showCreateStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create Staff Member
            </h2>
            <form onSubmit={handleCreateStaff} className="space-y-4">
              {staffFormError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {staffFormError}
                </div>
              )}
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  minLength={6}
                  required
                />
                <p className="text-gray-500 text-sm mt-1">
                  Minimum 6 characters
                </p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Role *</label>
                <select
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="SALES_MANAGER">Sales Manager (ID: 27)</option>
                  <option value="SALES_AGENT">Sales Agent (ID: 3)</option>
                  <option value="SUPPORT_MANAGER">
                    Support Manager (ID: 28)
                  </option>
                  <option value="SUPPORT_AGENT">Support Agent (ID: 29)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Staff"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateStaff(false);
                    setError("");
                    setSuccess("");
                    setStaffFormError("");
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
