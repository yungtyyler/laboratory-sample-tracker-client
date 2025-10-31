"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import type { ContactFormState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary-dark w-full rounded-md px-4 py-2 text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

const ContactForm = () => {
  const initialState: ContactFormState = { status: "idle", message: "" };
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
      console.log(state.message);
    }
  }, [state]);

  return (
    <form id="contact-form" action={formAction} className="space-y-6">
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
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
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
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
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
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>
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
          className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm"
        />
      </div>

      {state.message && (
        <p
          className={`text-sm ${
            state.status === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default ContactForm;
