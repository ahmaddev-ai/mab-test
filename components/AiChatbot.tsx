"use client";

import {
  Bot,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
  ExternalLink,
  Clock3,
} from "lucide-react";

import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Course, Messages, Visitor } from "@/types/chatbot";
import axios from "axios";
import { trackMetaEvent } from "@/lib/meta-tracking";

const STORAGE_VISITOR = "mabai_chat_visitor";
const STORAGE_MESSAGES = "mabai_chat_messages";

const initialMessage: Messages = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to Mian Ahmad Basit. Ask me about courses, AI services, training, or tutorials, and I'll point you in the right direction.",
};

// COURSE TABLE PARSER
function extractCourses(content: string): {
  title: string | null;
  courses: Course[];
} | null {
  const normalized = content.replace(/\\n/g, "\n").trim();

  // Find markdown table
  const tableMatch = normalized.match(
    /(?:\*\*([^*]+)\*\*\s*)?\n?\|[^\n]+\|\n\|[\s:-|]+\|\n((?:\|[^\n]+\|\n?)+)/m
  );

  if (!tableMatch) return null;

  const title = tableMatch[1] || null;
  const rows = tableMatch[2].trim().split("\n").filter(Boolean);

  const courses: Course[] = [];

  for (const row of rows) {
    const cells = row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 4) continue;

    const [name, duration, topics, url] = cells;

    if (!name || !duration || !topics) continue;

    courses.push({
      name,
      duration,
      topics,
      url: url?.trim() || "",
    });
  }

  if (!courses.length) return null;

  return {
    title,
    courses,
  };
}

// course card
function CourseCard({ course }: { course: Course }) {
  const topics = course.topics
    .split(",")
    .map((topic) => topic.trim())
    .filter(Boolean);

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #292E37",
        background: "linear-gradient(145deg, #15181E 0%, #111318 100%)",
      }}
    >
      {/* Course name */}

      <div
        style={{
          color: "#F1F2F4",
          fontSize: "12px",
          fontWeight: 650,
          lineHeight: "17px",
          marginBottom: "8px",
        }}
      >
        {course.name}
      </div>

      {/* Duration */}

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "4px 7px",
          borderRadius: "7px",
          border: "1px solid #3A3223",
          background: "#1C1913",
          color: "#D9B366",
          fontSize: "9px",
          lineHeight: "12px",
          marginBottom: "9px",
        }}
      >
        <Clock3 size={10} strokeWidth={1.8} />

        {course.duration}
      </div>

      {/* Topics */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "10px",
        }}
      >
        {topics.slice(0, 8).map((topic) => (
          <span
            key={topic}
            style={{
              padding: "3px 6px",
              borderRadius: "6px",
              border: "1px solid #292E37",
              background: "#101318",
              color: "#8E95A2",
              fontSize: "8.5px",
              lineHeight: "11px",
            }}
          >
            {topic}
          </span>
        ))}

        {topics.length > 8 && (
          <span
            style={{
              padding: "3px 6px",
              borderRadius: "6px",
              color: "#686F7B",
              fontSize: "8.5px",
            }}
          >
            +{topics.length - 8} more
          </span>
        )}
      </div>

      {/* Course link */}

      {course.url && (
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "100%",
            height: "31px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            borderRadius: "8px",
            border: "1px solid #3A3325",
            background: "#1D1A13",
            color: "#D9B366",
            textDecoration: "none",
            fontSize: "10px",
            fontWeight: 600,
          }}
        >
          View Course
          <ExternalLink size={11} strokeWidth={1.8} />
        </a>
      )}
    </div>
  );
}
// assistant content renderer
function AssistantContent({ content }: { content: string }) {
  const normalized = content.replace(/\\n/g, "\n").trim();

  const courseData = extractCourses(normalized);

  if (courseData) {
    /*
      Remove the course table from the text so we can render
      the table as proper cards.
    */

    const tableRegex =
      /(?:\*\*([^*]+)\*\*\s*)?\n?\|[^\n]+\|\n\|[\s:-|]+\|\n((?:\|[^\n]+\|\n?)+)/m;

    const beforeTable = normalized.replace(tableRegex, "").trim();

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          width: "100%",
        }}
      >
        {beforeTable && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {beforeTable}
          </ReactMarkdown>
        )}

        {courseData.title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              color: "#F1F2F4",
              fontSize: "12px",
              fontWeight: 650,
            }}
          >
            <Sparkles
              size={13}
              strokeWidth={1.7}
              style={{ color: "#D9B366" }}
            />

            {courseData.title}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
          }}
        >
          {courseData.courses.map((course, index) => (
            <CourseCard key={`${course.name}-${index}`} course={course} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {normalized}
    </ReactMarkdown>
  );
}
// markdown components
const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p
      style={{
        margin: "0 0 7px",
        color: "#D7D9DD",
        fontSize: "11.5px",
        lineHeight: "17px",
      }}
    >
      {children}
    </p>
  ),

  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong
      style={{
        color: "#F2F3F5",
        fontWeight: 650,
      }}
    >
      {children}
    </strong>
  ),

  em: ({ children }: { children?: React.ReactNode }) => (
    <em
      style={{
        color: "#C7CAD0",
      }}
    >
      {children}
    </em>
  ),

  h1: ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        color: "#F4F4F5",
        fontSize: "15px",
        fontWeight: 650,
        lineHeight: "20px",
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  ),

  h2: ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        color: "#F4F4F5",
        fontSize: "13px",
        fontWeight: 650,
        lineHeight: "18px",
        marginBottom: "7px",
      }}
    >
      {children}
    </div>
  ),

  h3: ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        color: "#EDEEF0",
        fontSize: "12px",
        fontWeight: 650,
        marginBottom: "6px",
      }}
    >
      {children}
    </div>
  ),

  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul
      style={{
        margin: "5px 0 8px",
        paddingLeft: "16px",
        color: "#C8CBD0",
        fontSize: "11px",
        lineHeight: "17px",
      }}
    >
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol
      style={{
        margin: "5px 0 8px",
        paddingLeft: "16px",
        color: "#C8CBD0",
        fontSize: "11px",
        lineHeight: "17px",
      }}
    >
      {children}
    </ol>
  ),

  li: ({ children }: { children?: React.ReactNode }) => (
    <li
      style={{
        marginBottom: "3px",
      }}
    >
      {children}
    </li>
  ),

  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#D9B366",
        textDecoration: "none",
        fontWeight: 550,
      }}
    >
      {children}
    </a>
  ),

  code: ({ children }: { children?: React.ReactNode }) => (
    <code
      style={{
        padding: "2px 4px",
        borderRadius: "4px",
        background: "#191C22",
        border: "1px solid #292E37",
        color: "#D9B366",
        fontSize: "10px",
      }}
    >
      {children}
    </code>
  ),

  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      style={{
        margin: "7px 0",
        padding: "6px 9px",
        borderLeft: "2px solid #D9B366",
        background: "#15171C",
        color: "#9FA5AF",
        fontSize: "10.5px",
      }}
    >
      {children}
    </blockquote>
  ),

  hr: () => (
    <div
      style={{
        height: "1px",
        background: "#292E37",
        margin: "9px 0",
      }}
    />
  ),

  table: ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "9px",
        border: "1px solid #292E37",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "480px",
          borderCollapse: "collapse",
          fontSize: "9px",
        }}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children }: { children?: React.ReactNode }) => (
    <th
      style={{
        padding: "7px",
        textAlign: "left",
        background: "#171A20",
        color: "#D9B366",
        borderBottom: "1px solid #292E37",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  ),

  td: ({ children }: { children?: React.ReactNode }) => (
    <td
      style={{
        padding: "7px",
        color: "#B9BEC7",
        borderBottom: "1px solid #242831",
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
  ),
};

export default function MabAIChatbot() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingLead, setSavingLead] = useState(false);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [messages, setMessages] = useState<Messages[]>([initialMessage]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    try {
      const savedVisitor = localStorage.getItem(STORAGE_VISITOR);
      const savedMessages = localStorage.getItem(STORAGE_MESSAGES);

      if (savedVisitor) {
        setVisitor(JSON.parse(savedVisitor));
      }
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load chatbot:", error);
    }
  }, []);
  // save messages
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages));
  }, [messages, mounted]);
  // auto scroll
  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [messages, open]);
  // prevent body scroll on mobile when chat is open
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;

    if (window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  // email to  admin when visitor starts chat
  const startChat = async (e: FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanPhone) return;

    setSavingLead(true);

    const newVisitor = {
      name: cleanName,
      phone: cleanPhone,
    };

    const branchCode = process.env.NEXT_PUBLIC_NEX_BRANCH_CODE;
    const projectName = process.env.NEXT_PUBLIC_NEX_PROJECT_NAME;
    const projectId = process.env.NEXT_PUBLIC_NEX_PROJECT_ID;
    const clientId = process.env.NEXT_PUBLIC_NEX_CLIENT_ID;
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const body = {
      firstName: cleanName,
      lastName: cleanName,
      email: "N/A",
      phoneNumber: cleanPhone,
      message: `I tried using chatbot of your website, just share the course details to me or contact me to check my interests. 
      This is automated message from ahmadbasit.com.
      `,
      source: "chatbot",
    };

    try {
      // Send lead to CRM
      await axios.post(`${serverUrl}/v1/nexskill/crm/leads/add`, body, {
        params: {
          branchCode,
          projectName,
        },
        headers: {
          Authorization: `Bearer ${projectId} ${clientId}`,
        },
      });
      trackMetaEvent("Lead", {
        content_name: "Chatbot contact request",
        content_category: "chatbot",
      });

      // Save visitor locally
      localStorage.setItem(STORAGE_VISITOR, JSON.stringify(newVisitor));

      setVisitor(newVisitor);

      setMessages([
        initialMessage,
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: `Nice to meet you, ${cleanName}. How can I help you today?`,
        },
      ]);
    } catch (error) {
      console.error("Lead submission failed:", error);

      // You can still allow the user to enter the chatbot
      localStorage.setItem(STORAGE_VISITOR, JSON.stringify(newVisitor));

      setVisitor(newVisitor);

      setMessages([
        initialMessage,
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: `Nice to meet you, ${cleanName}. How can I help you today?`,
        },
      ]);
    } finally {
      setSavingLead(false);
    }
  };
  // send message
  const sendMessage = async (e?: FormEvent, customMessage?: string) => {
    e?.preventDefault();

    const text = (customMessage ?? input).trim();

    if (!text || loading) return;

    const userMessage: Messages = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get chatbot response");
      }

      const data = await response.json();

      const assistantMessage: Messages = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.reply || "Sorry, I couldn't process that. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem(STORAGE_MESSAGES);

    setMessages([
      initialMessage,
      ...(visitor
        ? [
            {
              id: `welcome-${Date.now()}`,
              role: "assistant" as const,
              content: `Nice to meet you, ${visitor.name}. How can I help you today?`,
            },
          ]
        : []),
    ]);
  };

  const quickQuestions = ["Agentic AI", "Marketing", "Book a call"];

  if (!mounted) return null;

  return createPortal(
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Mian Ahmad Basit Assistant"
          style={{
            position: "fixed",
            right: "18px",
            bottom: "18px",
            width: "52px",
            height: "52px",
            minWidth: "52px",
            minHeight: "52px",
            zIndex: 999999,
            borderRadius: "15px",
            border: "1px solid rgba(217,179,102,0.35)",
            background: "#15181F",
            color: "#D9B366",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MessageCircle size={22} strokeWidth={1.8} />
        </button>
      )}
      {/* chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "18px",
            bottom: "18px",

            width: "340px",
            maxWidth: "calc(100vw - 24px)",

            height: "500px",
            maxHeight: "calc(100dvh - 32px)",

            zIndex: 999999,

            display: "flex",
            flexDirection: "column",

            overflow: "hidden",

            borderRadius: "16px",
            border: "1px solid #292E37",

            background: "#0D0F13",

            boxShadow: "0 20px 60px rgba(0,0,0,0.48)",

            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {/* header */}
          <div
            style={{
              height: "58px",
              minHeight: "58px",
              padding: "0 11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #242831",
              background: "#111419",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "33px",
                  height: "33px",
                  minWidth: "33px",
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#1D1A13",
                  border: "1px solid #4A3C20",
                  color: "#D9B366",
                }}
              >
                <Bot size={17} strokeWidth={1.7} />
              </div>

              <div>
                <div
                  style={{
                    color: "#F4F4F5",
                    fontSize: "13px",
                    lineHeight: "16px",
                    fontWeight: 650,
                  }}
                >
                  MAB Assistant
                </div>

                <div
                  style={{
                    marginTop: "1px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#727985",
                    fontSize: "9.5px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#50C878",
                    }}
                  />

                  {visitor ? `Hi, ${visitor.name}` : "Online"}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <button
                type="button"
                onClick={clearChat}
                style={{
                  width: "29px",
                  height: "29px",
                  border: "none",
                  background: "transparent",
                  color: "#6E7480",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: "7px",
                }}
              >
                <Trash2 size={14} strokeWidth={1.7} />
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  width: "29px",
                  height: "29px",
                  border: "none",
                  background: "transparent",
                  color: "#6E7480",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: "7px",
                }}
              >
                <X size={17} strokeWidth={1.7} />
              </button>
            </div>
          </div>
          {/* visitor form */}
          {!visitor ? (
            <div
              style={{
                flex: 1,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  margin: "0 auto 12px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#1D1A13",
                  border: "1px solid #4A3C20",
                  color: "#D9B366",
                }}
              >
                <Sparkles size={19} strokeWidth={1.7} />
              </div>

              <h3
                style={{
                  margin: 0,
                  textAlign: "center",
                  color: "#F4F4F5",
                  fontSize: "16px",
                  fontWeight: 650,
                }}
              >
                Welcome to Mian Ahmad Basit
              </h3>

              <p
                style={{
                  margin: "6px auto 17px",
                  maxWidth: "260px",
                  textAlign: "center",
                  color: "#777E8B",
                  fontSize: "10.5px",
                  lineHeight: "16px",
                }}
              >
                Enter your details to start chatting with the assistant.
              </p>

              <form
                onSubmit={startChat}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "9px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <User
                    size={14}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#666D79",
                    }}
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    style={{
                      width: "100%",
                      height: "41px",
                      boxSizing: "border-box",
                      padding: "0 11px 0 37px",
                      borderRadius: "10px",
                      border: "1px solid #292E37",
                      outline: "none",
                      background: "#12151A",
                      color: "#F4F4F5",
                      fontSize: "11.5px",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Phone
                    size={14}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#666D79",
                    }}
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    autoComplete="tel"
                    style={{
                      width: "100%",
                      height: "41px",
                      boxSizing: "border-box",
                      padding: "0 11px 0 37px",
                      borderRadius: "10px",
                      border: "1px solid #292E37",
                      outline: "none",
                      background: "#12151A",
                      color: "#F4F4F5",
                      fontSize: "11.5px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingLead || !name.trim() || !phone.trim()}
                  style={{
                    width: "100%",
                    height: "41px",
                    borderRadius: "10px",
                    border: "1px solid #D9B366",
                    background: "#D9B366",
                    color: "#111318",
                    fontSize: "11.5px",
                    fontWeight: 650,
                    cursor:
                      savingLead || !name.trim() || !phone.trim()
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      savingLead || !name.trim() || !phone.trim() ? 0.55 : 1,
                  }}
                >
                  {savingLead ? "Starting..." : "Start Chat"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* messages */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  padding: "11px",
                  overflowY: "auto",
                  background: "#0D0F13",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "9px",
                  }}
                >
                  {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                      <div
                        key={message.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: isUser ? "flex-end" : "flex-start",
                          gap: "6px",
                        }}
                      >
                        {!isUser && (
                          <div
                            style={{
                              width: "23px",
                              height: "23px",
                              minWidth: "23px",
                              marginTop: "1px",
                              borderRadius: "7px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#1D1A13",
                              border: "1px solid #42371F",
                              color: "#D9B366",
                            }}
                          >
                            <Bot size={12} />
                          </div>
                        )}

                        <div
                          style={{
                            maxWidth: isUser ? "78%" : "84%",
                            padding: "9px 10px",
                            borderRadius: isUser
                              ? "12px 12px 3px 12px"
                              : "3px 12px 12px 12px",
                            border: isUser
                              ? "1px solid #3D3423"
                              : "1px solid #282D36",
                            background: isUser ? "#1D1A13" : "#12151A",
                            color: "#D7D9DD",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {isUser ? (
                            <div
                              style={{
                                fontSize: "11.5px",
                                lineHeight: "17px",
                              }}
                            >
                              {message.content}
                            </div>
                          ) : (
                            <AssistantContent content={message.content} />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {loading && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: "23px",
                          height: "23px",
                          minWidth: "23px",
                          borderRadius: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#1D1A13",
                          border: "1px solid #42371F",
                          color: "#D9B366",
                        }}
                      >
                        <Bot size={12} />
                      </div>

                      <div
                        style={{
                          padding: "9px 11px",
                          borderRadius: "3px 12px 12px 12px",
                          border: "1px solid #282D36",
                          background: "#12151A",
                        }}
                      >
                        <Loader2
                          size={13}
                          className="animate-spin"
                          style={{
                            color: "#D9B366",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
              {/* quick questions */}
              <div
                style={{
                  padding: "7px 10px",
                  borderTop: "1px solid #242831",
                  background: "#101217",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      disabled={loading}
                      onClick={() => sendMessage(undefined, question)}
                      style={{
                        flexShrink: 0,
                        height: "26px",
                        padding: "0 8px",
                        borderRadius: "8px",
                        border: "1px solid #2B3039",
                        background: "#14171C",
                        color: "#AEB3BC",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              {/* inputs */}

              <form
                onSubmit={sendMessage}
                style={{
                  padding: "7px 10px 9px",
                  background: "#101217",
                }}
              >
                <div
                  style={{
                    height: "39px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "0 4px 0 10px",
                    borderRadius: "10px",
                    border: "1px solid #292E37",
                    background: "#0D0F13",
                  }}
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    disabled={loading}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#F4F4F5",
                      fontSize: "11px",
                    }}
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    style={{
                      width: "29px",
                      height: "29px",
                      minWidth: "29px",
                      borderRadius: "8px",
                      border: "none",
                      background:
                        input.trim() && !loading ? "#D9B366" : "#242831",
                      color: input.trim() && !loading ? "#111318" : "#656B76",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {loading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Send size={12} strokeWidth={2} />
                    )}
                  </button>
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    textAlign: "center",
                    color: "#4F5560",
                    fontSize: "8px",
                  }}
                >
                  Mian Ahmad Basit Assistant
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>,
    document.body
  );
}
