import { createContext, useContext, useState, useEffect } from "react";
import {
  apiFetch,
  login as apiLogin,
  me,
  registerCustomer as apiRegisterCustomer,
} from "@/api/client";
import { supabase } from "@/lib/supabase";

export type UserRole =
  | "super_admin"
  | "owner"
  | "sales_manager"
  | "sales_agent"
  | "support_manager"
  | "support_agent"
  | "finance"
  | "viewer"
  | "customer";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "suspended";
  createdAt: string;
  businessId?: string | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  tenantId?: string;
  title: string;
  description: string;
  status: LeadStatus;
  score: number;
  value: number;
  source?: string;
  assignedTo?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  tenantId?: string;
  customerId?: string;
  title: string;
  description: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  status: "pending" | "completed" | "in_progress";
  type?: string;
  businessId?: string;
}

export interface Appointment {
  id: string;
  businessId?: string;
  customerId?: string;
  date?: string;
  time?: string;
  location?: string;
  note?: string;
  status: "scheduled" | "cancelled" | "completed";
  createdAt?: string;
}

interface CRMContextType {
  currentUser: User | null;
  currentView: string;
  users: User[];
  customers: Customer[];
  leads: Lead[];
  tickets: Ticket[];
  tasks: Task[];
  appointments: Appointment[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  switchView: (view: string) => void;
  refreshCustomers: () => Promise<void>;
  refreshLeads: () => Promise<void>;
  refreshTickets: () => Promise<void>;
  refreshTasks: () => Promise<void>;
  refreshAppointments: () => Promise<void>;
  addLead: (lead: Partial<Lead>) => Promise<void>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addTicket: (ticket: Partial<Ticket>) => Promise<void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
}

const CRMContext = createContext(undefined as unknown as CRMContextType);

// Map DB lead status enum (uppercase) to frontend LeadStatus (lowercase)
function mapLeadStatus(dbStatus: string): LeadStatus {
  const map: Record<string, LeadStatus> = {
    NEW: "new",
    QUALIFIED: "qualified",
    WON: "won",
    LOST: "lost",
  };
  return map[String(dbStatus).toUpperCase()] ?? "new";
}

// Map DB ticket status enum to frontend status
function mapTicketStatus(
  dbStatus: string
): "open" | "in_progress" | "waiting" | "resolved" | "closed" {
  const map: Record<
    string,
    "open" | "in_progress" | "waiting" | "resolved" | "closed"
  > = {
    OPEN: "open",
    IN_PROGRESS: "in_progress",
    RESOLVED: "resolved",
    CLOSED: "closed",
  };
  return map[String(dbStatus).toUpperCase()] ?? "open";
}

function mapTicketPriority(
  dbPriority: string
): "low" | "medium" | "high" | "urgent" {
  const map: Record<string, "low" | "medium" | "high" | "urgent"> = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    URGENT: "urgent",
  };
  return map[String(dbPriority).toUpperCase()] ?? "medium";
}

function mapTaskStatus(dbStatus: string): "pending" | "completed" | "in_progress" {
  const map: Record<string, "pending" | "completed" | "in_progress"> = {
    PENDING: "pending",
    DONE: "completed",
  };
  return map[String(dbStatus).toUpperCase()] ?? "pending";
}

function mapAppointmentStatus(
  dbStatus: string
): "scheduled" | "cancelled" | "completed" {
  const map: Record<string, "scheduled" | "cancelled" | "completed"> = {
    SCHEDULED: "scheduled",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
  };
  return map[String(dbStatus).toUpperCase()] ?? "scheduled";
}

export function CRMProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState(null as User | null);
  const [currentView, setCurrentView] = useState("company-dashboard" as string);
  const [users, setUsers] = useState([] as User[]);
  const [customers, setCustomers] = useState([] as Customer[]);
  const [leads, setLeads] = useState([] as Lead[]);
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [tasks, setTasks] = useState([] as Task[]);
  const [appointments, setAppointments] = useState([] as Appointment[]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await apiLogin(email, password);
      const u: any = await me();
      const roleStr = String(u.role ?? "VIEWER").toLowerCase();
      const roleMap: Record<string, UserRole> = {
        super_admin: "super_admin",
        business_admin: "owner",
        sales_manager: "sales_manager",
        sales_agent: "sales_agent",
        support_manager: "support_manager",
        support_agent: "support_agent",
        finance: "finance",
        viewer: "viewer",
        customer: "customer",
      };

      const user: User = {
        id: String(u.id ?? "me"),
        name: String(u.fullName ?? u.name ?? email),
        email: String(u.email ?? email),
        role: roleMap[roleStr] || "viewer",
        status: "active",
        createdAt: new Date().toISOString(),
        businessId: u.businessId ? String(u.businessId) : null,
      };
      setCurrentUser(user);

      if (user.role === "super_admin") {
        setCurrentView("super-admin-dashboard");
      } else if (user.role === "owner") {
        setCurrentView("owner-dashboard");
      } else if (user.role === "sales_manager") {
        setCurrentView("sales-manager-dashboard");
      } else if (user.role === "sales_agent") {
        setCurrentView("sales-agent-dashboard");
      } else if (user.role === "support_manager") {
        setCurrentView("support-manager-dashboard");
      } else if (user.role === "support_agent") {
        setCurrentView("support-agent-dashboard");
      } else if (user.role === "finance") {
        setCurrentView("finance-dashboard");
      } else if (user.role === "viewer") {
        setCurrentView("viewer-dashboard");
      } else {
        setCurrentView("company-dashboard");
      }

      if (user.role !== "super_admin") {
        await Promise.all([
          refreshCustomersForUser(user),
          refreshLeadsForUser(user),
          refreshTicketsForUser(user),
          refreshTasksForUser(user),
          refreshAppointmentsForUser(user),
        ]);
      }
      return true;
    } catch (e: any) {
      console.error("Login failed", e);
      throw e;
    }
  };

  const register = async (payload: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<boolean> => {
    try {
      await apiRegisterCustomer(payload);
      return true;
    } catch (e: any) {
      console.error("Register failed", e);
      throw e;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUsers([]);
    setCustomers([]);
    setLeads([]);
    setTickets([]);
    setTasks([]);
    setAppointments([]);
    setCurrentView("company-dashboard");
    localStorage.removeItem("token");
  };

  const switchView = (view: string) => setCurrentView(view);

  // --- Internal helpers that accept a user argument (used during login before state settles) ---

  const refreshCustomersForUser = async (user: User) => {
    if (user.role === "super_admin" || !user.businessId) return;
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email, phone, created_at, updated_at")
        .eq("business_id", Number(user.businessId))
        .eq("deleted", false);
      if (error) throw error;
      setCustomers(
        (data || []).map((c: any) => ({
          id: String(c.id),
          name: c.name ?? "",
          email: c.email ?? "",
          phone: c.phone ?? "",
          createdAt: c.created_at ?? new Date().toISOString(),
          updatedAt: c.updated_at ?? new Date().toISOString(),
        }))
      );
    } catch (e) {
      console.warn("Failed to refresh customers from Supabase", e);
    }
  };

  const refreshLeadsForUser = async (user: User) => {
    if (user.role === "super_admin" || !user.businessId) return;
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, notes, status, score, created_at, updated_at")
        .eq("business_id", Number(user.businessId));
      if (error) throw error;
      setLeads(
        (data || []).map((l: any) => ({
          id: String(l.id),
          title: l.name ?? "",
          description: l.notes ?? "",
          status: mapLeadStatus(l.status ?? "NEW"),
          score: l.score ?? 0,
          value: 0,
          createdAt: l.created_at ?? new Date().toISOString(),
          updatedAt: l.updated_at ?? new Date().toISOString(),
        }))
      );
    } catch (e) {
      console.warn("Failed to refresh leads from Supabase", e);
    }
  };

  const refreshTicketsForUser = async (user: User) => {
    if (user.role === "super_admin" || !user.businessId) return;
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("id, title, description, status, priority, created_at, updated_at")
        .eq("business_id", Number(user.businessId));
      if (error) throw error;
      setTickets(
        (data || []).map((t: any) => ({
          id: String(t.id),
          title: t.title ?? "",
          description: t.description ?? "",
          status: mapTicketStatus(t.status ?? "OPEN"),
          priority: mapTicketPriority(t.priority ?? "MEDIUM"),
          createdAt: t.created_at ?? new Date().toISOString(),
          updatedAt: t.updated_at ?? new Date().toISOString(),
        }))
      );
    } catch (e) {
      console.warn("Failed to refresh tickets from Supabase", e);
    }
  };

  const refreshTasksForUser = async (user: User) => {
    if (user.role === "super_admin" || !user.businessId) return;
    try {
      const { data, error } = await supabase
        .from("follow_up_tasks")
        .select("id, title, due_date, status, created_at")
        .eq("business_id", Number(user.businessId));
      if (error) throw error;
      setTasks(
        (data || []).map((t: any) => ({
          id: String(t.id),
          title: t.title ?? "",
          dueDate: t.due_date ?? undefined,
          status: mapTaskStatus(t.status ?? "PENDING"),
          businessId: user.businessId ?? undefined,
        }))
      );
    } catch (e) {
      console.warn("Failed to refresh tasks from Supabase", e);
    }
  };

  const refreshAppointmentsForUser = async (user: User) => {
    if (user.role === "super_admin" || !user.businessId) return;
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, business_id, customer_id, date, time, location, note, status, created_at")
        .eq("business_id", Number(user.businessId));
      if (error) throw error;
      setAppointments(
        (data || []).map((a: any) => ({
          id: String(a.id),
          businessId: a.business_id ? String(a.business_id) : undefined,
          customerId: a.customer_id ? String(a.customer_id) : undefined,
          date: a.date ?? undefined,
          time: a.time ?? undefined,
          location: a.location ?? undefined,
          note: a.note ?? undefined,
          status: mapAppointmentStatus(a.status ?? "SCHEDULED"),
          createdAt: a.created_at ?? undefined,
        }))
      );
    } catch (e) {
      console.warn("Failed to refresh appointments from Supabase", e);
    }
  };

  // --- Public refresh functions that use currentUser state ---

  const refreshCustomers = async () => {
    if (!currentUser) return;
    await refreshCustomersForUser(currentUser);
  };

  const refreshLeads = async () => {
    if (!currentUser) return;
    await refreshLeadsForUser(currentUser);
  };

  const refreshTickets = async () => {
    if (!currentUser) return;
    await refreshTicketsForUser(currentUser);
  };

  const refreshTasks = async () => {
    if (!currentUser) return;
    await refreshTasksForUser(currentUser);
  };

  const refreshAppointments = async () => {
    if (!currentUser) return;
    await refreshAppointmentsForUser(currentUser);
  };

  // --- Mutations still go through Spring Boot API ---

  const addLead = async (lead: Partial<Lead>) => {
    await apiFetch(`/api/leads`, {
      method: "POST",
      body: JSON.stringify(lead),
      auth: true,
    });
    await refreshLeads();
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    await apiFetch(`/api/leads/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      auth: true,
    });
    await refreshLeads();
  };

  const deleteLead = async (id: string) => {
    await apiFetch(`/api/leads/${id}`, { method: "DELETE", auth: true });
    await refreshLeads();
  };

  const addTicket = async (ticket: Partial<Ticket>) => {
    await apiFetch(`/api/tickets`, {
      method: "POST",
      body: JSON.stringify(ticket),
      auth: true,
    });
    await refreshTickets();
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    await apiFetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      auth: true,
    });
    await refreshTickets();
  };

  const deleteTicket = async (id: string) => {
    await apiFetch(`/api/tickets/${id}`, { method: "DELETE", auth: true });
    await refreshTickets();
  };

  useEffect(() => {
    if (currentUser && currentUser.role !== "super_admin") {
      refreshCustomers();
      refreshLeads();
      refreshTickets();
      refreshTasks();
      refreshAppointments();
    }
  }, [currentUser]);

  const value: CRMContextType = {
    currentUser,
    currentView,
    users,
    customers,
    leads,
    tickets,
    tasks,
    appointments,
    login,
    register,
    logout,
    switchView,
    refreshCustomers,
    refreshLeads,
    refreshTickets,
    refreshTasks,
    refreshAppointments,
    addLead,
    updateLead,
    deleteLead,
    addTicket,
    updateTicket,
    deleteTicket,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within CRMProvider");
  }
  return context;
}
