"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/soul/primitives/Badge";
import Button from "@/soul/primitives/Button";

// Single‑file, drop‑in component that recreates the shared layout in English.
// TailwindCSS required. No external UI libs. Accessible, responsive, and clean.
// Place this anywhere in your Next.js app (e.g., app/contact/page.tsx) and export default.



export function InquiryForm() {
  const options = [
    "Web Design",
    "Logo / Branding",
    "Define Purpose",
    "Strategy",
    "Content",
    "UX Design",
    "Packaging",
    "Editorial",
    "Illustrations",
    "Other",
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [budget, setBudget] = useState(15000);

  const toggle = (label: string) =>
    setSelected((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  const inputBase =
    "w-full rounded-2xl border border-black px-4 py-1.5 outline-none focus:ring-1 focus:ring-purple-300 ";

  return (
    <form className="w-full space-y-16 rounded-2xl hover:shadow-2xl p-10">
      {/* How can we help? */}
      <div className="space-y-10">
        <h3 className="text-3xl font-medium">How can we help?</h3>
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => (
            <Badge
              key={opt}
              variant="filter"
              interactive
              active={selected.includes(opt)}
              onClick={() => toggle(opt)}
              className={selected.includes(opt)
                ? "border-black bg-black text-white px-4 py-6"
                : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 px-4 py-6"}
            >
              {opt}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tell us more */}
      <div className="space-y-3">
        <h3 className="text-xl font-medium">Tell us more about your project.</h3>
        <div className="relative">


          <label htmlFor="about" className="sr-only">
            Briefly describe your project
          </label>
          <textarea
            id="about"
            placeholder="Briefly describe your project."
            className="min-h-[140px] w-full resize-y rounded-2xl border border-black p-4 pr-12 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Website domain */}
      <div className="space-y-3">
        <h3 className="text-xl font-medium">Do you already have a website?</h3>
        <label htmlFor="domain" className="text-sm text-black">
          Domain
        </label>
        <input id="domain" type="text" inputMode="url" placeholder="e.g. example.com" className={inputBase} />
      </div>

      {/* Timing (Start / Completion) */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">What does your timing look like?</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="start" className="text-sm text-black">
              Start
            </label>
            <input id="start" type="month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className={inputBase} />
          </div>
          <div className="space-y-2">
            <label htmlFor="end" className="text-sm text-black">
              Completion
            </label>
            <input id="end" type="month" value={endMonth} onChange={(e) => setEndMonth(e.target.value)} className={inputBase} />
          </div>
        </div>
      </div>

      {/* Budget / Investment */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">What do you plan to invest?</h3>
        <div className="flex items-center gap-4">
          <input
            aria-label="Budget"
            type="range"
            min={0}
            max={100000}
            step={500}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="whitespace-nowrap rounded-full border px-3 py-1 text-sm">${" "}
            {budget.toLocaleString()}
          </div>
        </div>
        <p className="text-sm text-zinc-500">A ballpark figure is fine.</p>
      </div>

      {/* Contact details */}
      <div className="space-y-4 ">
        <h3 className="text-xl font-medium">Contact details</h3>
        <div className="grid grid-cols-1  gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="first">First name*</label>
            <input id="first" className={inputBase} placeholder="Your first name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="last" >Last name*</label>
            <input id="last" className={inputBase} placeholder="Your last name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email*</label>
            <input id="email" type="email" className={inputBase} placeholder="you@company.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone">Phone*</label>
            <input id="phone" type="tel" className={inputBase} placeholder="+1 (555) 000‑0000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" >Position</label>
            <input id="role" className={inputBase} placeholder="Your role" />
          </div>
          <div className="space-y-2">
            <label htmlFor="company">Company</label>
            <input id="company" className={inputBase} placeholder="Company name" />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <h3 className="text-xl font-medium">Comments</h3>
        <textarea className="min-h-[140px] w-full resize-y rounded-2xl border border-zinc-200 p-4 outline-none focus:ring-2 focus:ring-black" />
      </div>

      {/* Submit + confirmation card */}
      <div className="space-y-6">
        <Button variant="primary" size="md" href="/contact" >
          Send inquiry
        </Button>

        {/* Mini confirmation card (static demo) */}
        <div className="w-full bg-kainé-gray/30  rounded-2xl border p-5 shadow-sm">
          <div className="mb-2  text-zinc-500">Your inquiry inbox says:</div>
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image
                src="/assets/journal/journal-07.jpg"
                alt="Team"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-2xl">We’ll be in touch shortly. See you then 👋</p>
          </div>
        </div>
      </div>
    </form>
  );
}