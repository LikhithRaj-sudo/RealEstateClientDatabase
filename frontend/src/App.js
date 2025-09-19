import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", interest: "" });
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients").then(res => setClients(res.data));
  }, []);

  const addClient = async () => {
    if (!form.name || !form.email) return alert("Please fill required fields");
    const res = await axios.post("http://localhost:5000/api/clients", form);
    setClients([...clients, res.data]);
    setForm({ name: "", email: "", phone: "", budget: "", interest: "" });
  };

  const sendMessage = async () => {
    if (!chat) return;
    setMessages([...messages, { from: "user", text: chat }]);
    const res = await axios.post("http://localhost:5000/api/chatbot", { question: chat });
    setMessages([...messages, { from: "user", text: chat }, { from: "bot", text: res.data.answer }]);
    setChat("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">🏡 Real Estate Dashboard</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Phone"
          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Budget"
          value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Interest (2BHK, Villa...)"
          value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} />
        <button onClick={addClient} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          ➕ Add Client
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Client List</h2>
        <ul className="space-y-2">
          {clients.map(c => (
            <li key={c._id} className="p-3 rounded-lg bg-purple-50">
              <b>{c.name}</b> — {c.interest} (₹{c.budget})
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">💬 Market Info Chatbot</h2>
        <div className="h-64 overflow-y-auto border p-3 rounded-lg bg-gray-50 mb-3">
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.from === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded-xl ${m.from === "user" ? "bg-purple-500 text-white" : "bg-gray-200"}`}>
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input className="flex-1 border rounded-l-lg p-2"
            placeholder="Ask about rates, loans..." value={chat} onChange={e => setChat(e.target.value)} />
          <button onClick={sendMessage} className="bg-purple-600 text-white px-4 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
}