import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageFrame } from "@/components/comic/PageFrame";
import { Halftone, DiagonalStripes } from "@/components/comic/Halftone";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OmerTechDude" },
      {
        name: "description",
        content:
          "Start a project with Omer Taib. Share the goals, scope, and timeline, and I’ll get back to you within 48 hours.",
      },
      { property: "og:title", content: "Contact — OmerTechDude" },
      {
        property: "og:description",
        content:
          "A direct line for your next project, redesign, or idea worth building.",
      },
    ],
  }),
  component: ContactPage,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgvazve";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setErrorMsg("Tell me a little more about the project.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: fd,
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <PageFrame chapter="Contact" title="// contact.tsx">
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-ink text-cream">
        <Halftone
          className="absolute inset-0"
          color="var(--cream)"
          opacity={0.08}
          size={9}
        />
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <DiagonalStripes
          className="absolute -right-10 top-0 h-40 w-60"
          color="var(--cream)"
          opacity={0.12}
        />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-24">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">
              // contact
            </div>
            <h1 className="mt-2 font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85]">
              LET’S BUILD <br />
              THE <span className="text-yellow">NEXT</span> <br />
              <span className="text-red">CHAPTER.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cream/85">
              Share a few details about your project, and I’ll reply within two
              business days with next steps, questions, or a clear proposal path.
            </p>
            <div className="mt-8 space-y-3 font-mono text-xs uppercase tracking-widest text-cream/80">
              <div>
                <span className="text-cyan">// availability</span> &nbsp; Taking
                new projects next quarter
              </div>
              <div>
                <span className="text-cyan">// response</span> &nbsp; Within 48
                hours
              </div>
              <div>
                <span className="text-cyan">// location</span> &nbsp; Remote ·
                Worldwide
              </div>
            </div>
          </div>

          <div className="relative">
            <form
              onSubmit={onSubmit}
              className="panel relative bg-offwhite p-6 text-ink md:p-8"
            >
              <div className="absolute -right-3 -top-3 grid h-16 w-16 -rotate-6 place-items-center rounded-full border-[2.5px] border-ink bg-red font-mono text-[10px] uppercase tracking-widest text-cream shadow-[3px_3px_0_0_var(--ink)]">
                SEND
              </div>

              <fieldset disabled={status === "loading"} className="grid gap-4">
                <Field
                  label="Your Name"
                  id="name"
                  name="name"
                  placeholder="Bruce Wayne"
                  required
                />

                <Field
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="bruce@wayne.co"
                  required
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    label="Project Type"
                    id="projectType"
                    name="projectType"
                    options={[
                      "Business Website",
                      "Portfolio",
                      "Landing Page",
                      "Redesign",
                      "Other",
                    ]}
                  />
                  <Select
                    label="Budget"
                    id="budget"
                    name="budget"
                    options={[
                      "Under $1k",
                      "$1k – $3k",
                      "$3k – $7k",
                      "$7k+",
                      "Let's discuss",
                    ]}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    placeholder="What are you building? Who is it for? What does success look like?"
                    className="mt-1 w-full border-[2.5px] border-ink bg-cream p-3 font-sans text-base text-ink shadow-[3px_3px_0_0_var(--ink)] focus:outline-none focus:ring-0"
                  />
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="border-2 border-ink bg-red px-3 py-2 font-mono text-xs uppercase tracking-widest text-cream"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="group mt-2 inline-flex items-center justify-center gap-3 border-[2.5px] border-ink bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-cream shadow-[5px_5px_0_0_var(--ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-cream border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>Send message →</>
                  )}
                </button>
              </fieldset>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    role="status"
                    initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 grid place-items-center bg-cream/95 p-6"
                  >
                    <div className="panel max-w-sm bg-yellow p-6 text-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
                        Message received
                      </div>
                      <div className="mt-2 font-display text-7xl leading-none">
                        OK!
                      </div>
                      <p className="mt-3 text-ink">
                        Thanks — I’ll review this and get back to you within 48
                        hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-4 border-2 border-ink bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cream"
                      >
                        Send another →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-cream/60">
              // form.tsx · accessible · validated · Formspree-ready
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className="mt-1 w-full border-[2.5px] border-ink bg-cream px-3 py-2.5 font-sans text-base text-ink shadow-[3px_3px_0_0_var(--ink)] focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  id,
  name,
  options,
}: {
  label: string;
  id: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <select
          id={id}
          name={name}
          className="w-full appearance-none border-[2.5px] border-ink bg-cream px-3 py-2.5 pr-9 font-sans text-base text-ink shadow-[3px_3px_0_0_var(--ink)] focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}