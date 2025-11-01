"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export default function TaskManager() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        (async () => {
          setSession(session);
        })();
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Homepage",
      assignee: "Kavisha",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-03-15",
    },
    {
      id: 2,
      title: "Backend API",
      assignee: "Ramya",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-03-10",
    },
    {
      id: 3,
      title: "Project Demo",
      assignee: "Renuka",
      status: "Pending",
      priority: "Low",
      dueDate: "2024-03-20",
    },
    {
      id: 4,
      title: "App Package",
      assignee: "Dhanii",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-03-18",
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({
        title: "",
        assignee: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });
      setShowAddTask(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fd",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: "white",
          padding: "24px 64px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              margin: 0,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mutmiz
          </h1>
          <nav style={{ display: "flex", gap: "32px" }}>
            <a
              href="#"
              style={{
                color: "#475569",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
                transition: "color 0.2s",
              }}
            >
              Services
            </a>
            <a
              href="#"
              style={{
                color: "#475569",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              How it works
            </a>
            <a
              href="#"
              style={{
                color: "#475569",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              About us
            </a>
          </nav>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a
            href="#"
            style={{
              color: "#475569",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Agents
          </a>
          <a
            href="#"
            style={{
              color: "#475569",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Projects
          </a>
          <a
            href="#"
            style={{
              color: "#475569",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Affiliates
          </a>
          {!session ? (
            <button
              onClick={() => router.push("/sign-in")}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                transition: "all 0.3s",
              }}
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </header>

      <section
        style={{
          position: "relative",
          padding: "100px 64px 120px",
          background: "white",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            zIndex: 0,
          }}
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q250,100 250,400 T0,800 L500,800 L500,0 Z"
            fill="url(#heroGradient)"
            opacity="0.15"
          />
          <defs>
            <linearGradient
              id="heroGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "64px",
                fontWeight: "800",
                lineHeight: "1.1",
                marginBottom: "28px",
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Take Control of your
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Projects & Team
              </span>
            </h2>
            <p
              style={{
                fontSize: "19px",
                color: "#64748b",
                marginBottom: "40px",
                lineHeight: "1.7",
                maxWidth: "520px",
              }}
            >
              Streamline your workflow with an intuitive task management system
              that keeps everyone aligned and productive.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  border: "none",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 8px 24px rgba(99, 102, 241, 0.35)",
                }}
              >
                Get Started
              </button>
              <button
                style={{
                  background: "white",
                  color: "#6366f1",
                  border: "2px solid #e2e8f0",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "32px",
              padding: "48px",
              boxShadow: "0 24px 64px rgba(99, 102, 241, 0.3)",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: "24px",
                padding: "32px",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "600",
                  }}
                >
                  My List!
                </h3>
                <div
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  ☰
                </div>
              </div>
          

              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "18px",
                  padding: "24px",
                  marginBottom: "20px",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Recent Activity
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    View all →
                  </span>
                </div>
                <div
                  style={{ color: "white", fontSize: "14px", fontWeight: "500" }}
                >
                  Design Homepage
                </div>
              </div>

              {["Trustpilot", "Backend API", "Project Demo", "App Package"].map(
                (item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      padding: "18px",
                      marginBottom: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          background: "rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        ⭐
                      </div>
                      <span
                        style={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      4.9
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "80px 64px",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "48px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "700",
                margin: 0,
                color: "#0f172a",
              }}
            >
              My Tasks
            </h2>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                border: "none",
                padding: "14px 36px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)",
                transition: "all 0.3s",
              }}
            >
              + Add New Task
            </button>
          </div>

          {showAddTask && (
            <div
              style={{
                background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
                borderRadius: "20px",
                padding: "32px",
                marginBottom: "32px",
                border: "2px solid #e0e7ff",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "24px",
                  color: "#1e293b",
                  fontWeight: "600",
                }}
              >
                Create New Task
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border 0.3s",
                  }}
                />
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    outline: "none",
                  }}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    outline: "none",
                  }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={handleAddTask}
                    style={{
                      flex: 1,
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      color: "white",
                      border: "none",
                      padding: "14px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    style={{
                      flex: 1,
                      background: "#f1f5f9",
                      color: "#64748b",
                      border: "none",
                      padding: "14px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "2px solid #f1f5f9",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(99, 102, 241, 0.15)";
                  e.currentTarget.style.borderColor = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#f1f5f9";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: "600",
                      margin: 0,
                      color: "#0f172a",
                    }}
                  >
                    {task.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={{
                      background: "#fef2f2",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "20px",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontWeight: "600",
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#94a3b8",
                      margin: "0 0 6px 0",
                      fontWeight: "500",
                    }}
                  >
                    Assigned to
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#1e293b",
                      margin: 0,
                      fontWeight: "600",
                    }}
                  >
                    {task.assignee}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      padding: "7px 16px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: "600",
                      background:
                        task.status === "Completed"
                          ? "#d1fae5"
                          : task.status === "In Progress"
                          ? "#dbeafe"
                          : "#fef3c7",
                      color:
                        task.status === "Completed"
                          ? "#065f46"
                          : task.status === "In Progress"
                          ? "#1e40af"
                          : "#92400e",
                    }}
                  >
                    {task.status}
                  </span>
                  <span
                    style={{
                      padding: "7px 16px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: "600",
                      background:
                        task.priority === "High"
                          ? "#fee2e2"
                          : task.priority === "Medium"
                          ? "#fef9c3"
                          : "#d1fae5",
                      color:
                        task.priority === "High"
                          ? "#991b1b"
                          : task.priority === "Medium"
                          ? "#713f12"
                          : "#065f46",
                    }}
                  >
                    {task.priority}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Due:{" "}
                  <span style={{ color: "#0f172a", fontWeight: "600" }}>
                    {task.dueDate}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "100px 64px",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: "-10%",
            transform: "translateY(-50%)",
            width: "40%",
            height: "120%",
            zIndex: 0,
            opacity: 0.4,
          }}
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
        >
          <path
            d="M400,0 Q150,100 150,400 T400,800 L0,800 L0,0 Z"
            fill="url(#featureGradient)"
            opacity="0.08"
          />
          <defs>
            <linearGradient
              id="featureGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "16px",
              color: "#0f172a",
            }}
          >
            Comprehensive{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Feature Set
            </span>
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "19px",
              color: "#64748b",
              marginBottom: "80px",
            }}
          >
            Everything you need to manage tasks efficiently
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px",
            }}
          >
            {[
              {
                icon: "🔄",
                title: "Data Sync and Backup",
                desc: "Your tasks are synced in real-time across all your devices",
              },
              {
                icon: "📎",
                title: "Task Attachments",
                desc: "Attach files, documents, and images to tasks for better context",
              },
              {
                icon: "📊",
                title: "Project Overview",
                desc: "Design a custom visualization dashboard for tracking project progress",
              },
              {
                icon: "⏰",
                title: "Total Working Hours",
                desc: "Count the total working hours for effective time management",
              },
              {
                icon: "🔄",
                title: "Efficiency Mode",
                desc: "Your tasks are synced in real-time across all your devices",
              },
              {
                icon: "📎",
                title: "Efficiency Mode",
                desc: "Attach files, documents, and images to tasks for better context",
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "40px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  border: "2px solid #f1f5f9",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(99, 102, 241, 0.12)";
                  e.currentTarget.style.borderColor = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = "#f1f5f9";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    marginBottom: "24px",
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    marginBottom: "14px",
                    color: "#0f172a",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "100px 64px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
          }}
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "64px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            { value: "29M+", label: "Installed over the time" },
            { value: "199K+", label: "Active Users" },
            { value: "100M+", label: "Task Collaborators" },
          ].map((stat, i) => (
            <div key={i}>
              <h3
                style={{
                  fontSize: "56px",
                  fontWeight: "800",
                  color: "white",
                  margin: "0 0 16px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </h3>
              <p
                style={{
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "120px 64px",
          background: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            zIndex: 0,
          }}
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q250,100 250,400 T0,800 L500,800 L500,0 Z"
            fill="url(#ctaGradient)"
            opacity="0.06"
          />
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "52px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "28px",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Ready? Let's Start with Mutmiz
            <br />
            and Get Awesome Experience
          </h2>
          <p
            style={{
              fontSize: "19px",
              color: "#64748b",
              marginBottom: "48px",
              lineHeight: "1.7",
              maxWidth: "720px",
              margin: "0 auto 48px",
            }}
          >
            Join thousands of teams who are already managing their projects more
            efficiently. Start your journey with Mutmiz today and experience the
            difference.
          </p>
          <button
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              color: "white",
              border: "none",
              padding: "18px 56px",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "700",
              boxShadow: "0 12px 32px rgba(99, 102, 241, 0.3)",
            }}
          >
            Get Started Now
          </button>
        </div>
      </section>

      <footer
        style={{
          background: "#0f172a",
          color: "white",
          padding: "48px 64px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: "15px", color: "#94a3b8", fontWeight: "500" }}>
          © 2025 Mutmiz. All rights reserved. | Privacy policy | Terms &
          conditions
        </p>
      </footer>
    </div>
  );
}
