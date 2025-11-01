"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; 
import { CircleCheck as CheckCircle2, Circle, Plus, Trash2, LogOut, Menu, X, TrendingUp, Target, Zap } from "lucide-react";

interface Task {
  id: string;
  title: string;
  is_completed: boolean;
  user_id: string;
  inserted_at: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter(); 

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/"); // ✅ redirect if not logged in
        return;
      }

      setUserId(user.id);
      await loadTasks(user.id);
      setLoading(false); // ✅ move loading false here after tasks load
    };

    checkUser();
  }, []);

  const loadTasks = async (uid: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", uid)
      .order("inserted_at", { ascending: false });

    if (!error && data) {
      setTasks(data);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !userId) return;

    setIsAddingTask(true);
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title: newTask, user_id: userId, is_completed: false }])
      .select()
      .single();

    if (!error && data) {
      setTasks([data, ...tasks]);
      setNewTask("");
    }
    setIsAddingTask(false);
  };

  const handleToggle = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_completed: completed })
      .eq("id", id);

    if (!error) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, is_completed: completed } : t)));
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // ✅ redirect to login after sign out
  };

  const completedCount = tasks.filter((t) => t.is_completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#eef2ff] to-[#e5e9ff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7c3aed]/20 border-t-[#7c3aed] rounded-full animate-spin" />
          <p className="text-[#6b7280] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ No need for userId check here anymore because redirect handles it
  // if (!userId) { ... }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#eef2ff] to-[#e5e9ff]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
                Mutmiz
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSignOut}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white border border-white/60 text-[#6b7280] hover:text-[#1f2937] transition-all shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-xl bg-white/80 hover:bg-white border border-white/60"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pb-4 space-y-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-white/60 text-[#6b7280]"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] p-8 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold">Task Manager</span>
                </div>

                <h2 className="text-3xl font-bold mb-3">
                  Maximize Your<br />Productivity
                </h2>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Organize your tasks and stay focused with our powerful task manager app
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{tasks.length}</div>
                    <div className="text-xs text-white/80">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{completedCount}</div>
                    <div className="text-xs text-white/80">Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{completionRate}%</div>
                    <div className="text-xs text-white/80">Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#1f2937] mb-1">{completedCount}</div>
                <div className="text-sm text-[#6b7280]">Completed</div>
              </div>

              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center mb-4 shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#1f2937] mb-1">{pendingCount}</div>
                <div className="text-sm text-[#6b7280]">Pending</div>
              </div>
            </div>

            {/* Mobile Preview Card */}
            <div className="hidden lg:block relative rounded-3xl bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] p-8 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

              <div className="relative">
                <h3 className="text-white text-xl font-bold mb-2">Ready to boost?</h3>
                <p className="text-white/90 text-sm mb-6">
                  Start organizing your tasks now and see the difference
                </p>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/30" />
                    <div className="flex-1">
                      <div className="h-2 bg-white/30 rounded-full w-24 mb-2" />
                      <div className="h-2 bg-white/20 rounded-full w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <div className="h-2 bg-white/30 rounded-full flex-1" />
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
                      <Circle className="w-4 h-4 text-white" />
                      <div className="h-2 bg-white/30 rounded-full flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Tasks Section */}
          <section className="lg:col-span-8 space-y-6">
            {/* Progress Overview */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-1">Your Tasks</h2>
                  <p className="text-sm text-[#6b7280]">Keep track of your progress</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-semibold text-sm shadow-md">
                    {completedCount} Done
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white border border-white/60 text-[#6b7280] font-semibold text-sm">
                    {tasks.length} Total
                  </div>
                </div>
              </div>

              <div className="relative h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-[#6b7280]">
                <span>Progress</span>
                <span className="font-semibold">{completionRate}%</span>
              </div>
            </div>

            {/* Add Task Form */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#1f2937] mb-4">Add New Task</h3>
              <form onSubmit={handleAddTask} className="flex gap-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-white/60 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 outline-none transition-all text-[#1f2937] placeholder:text-[#9ca3af]"
                  disabled={isAddingTask}
                />
                <button
                  type="submit"
                  disabled={isAddingTask || !newTask.trim()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </form>
            </div>

            {/* Tasks List */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1f2937]">Tasks</h3>
                {tasks.length > 0 && (
                  <span className="text-sm text-[#6b7280]">
                    {pendingCount} remaining
                  </span>
                )}
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e5e7eb] to-[#d1d5db] mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#9ca3af]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1f2937] mb-2">No tasks yet</h4>
                  <p className="text-sm text-[#6b7280]">Add your first task to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-white border border-white/60 hover:border-[#7c3aed]/20 hover:shadow-md transition-all"
                      style={{
                        animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <button
                        onClick={() => handleToggle(task.id, !task.is_completed)}
                        className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
                      >
                        {task.is_completed ? (
                          <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                        ) : (
                          <Circle className="w-6 h-6 text-[#d1d5db] hover:text-[#7c3aed]" />
                        )}
                      </button>

                      <span
                        className={`flex-1 text-[#1f2937] transition-all ${
                          task.is_completed
                            ? "line-through text-[#9ca3af]"
                            : "font-medium"
                        }`}
                      >
                        {task.title}
                      </span>

                      <button
                        onClick={() => handleDelete(task.id)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-[#fee2e2] text-[#9ca3af] hover:text-[#ef4444] transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-[#6b7280]">
        <p>Built with care using Next.js and Supabase</p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
