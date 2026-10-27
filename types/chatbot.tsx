export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type Messages = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Visitor = {
  name: string;
  phone: string;
};

export type Course = {
  name: string;
  duration: string;
  topics: string;
  url: string;
};
