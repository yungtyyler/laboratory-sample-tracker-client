"use client";

import { useState, FormEvent } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    // TODO: Replace this with actual form submission logic
    // Option 1: Send to our own API endpoint
    // Option 2: Use a service like Formspree, Netlify Forms, etc.
    console.log("Submitting:", { name, email, subject, message });
    // For now... simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // --- End of placeholder ---

    // Success/error handling
    const success = Math.random() > 0.2; // Simulate success/failure
    if (success) {
      setStatus("success");
      setFeedback("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus("error");
      setFeedback(
        "Something went wrong. Please try again or email us directly."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
      {/* Subject Input */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>

      {feedback && (
        <p
          className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {feedback}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-primary hover:bg-primary-dark w-full rounded-md px-4 py-2 text-white shadow-sm transition hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
