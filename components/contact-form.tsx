"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { VerifaliaRestClient } from "verifalia";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

// Cooldown Constants (in milliseconds)
const SUCCESS_COOLDOWN = 60 * 60 * 1000; // 1 Hour
const VALIDATION_COOLDOWN = 60 * 60 * 1000; // 1 Hour
const MAX_FAILED_ATTEMPTS = 3;

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { t } = useLanguage();

  const activeError = sendError || emailError;

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        y: 100,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".form-field", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // GSAP Shake on Error
  useEffect(() => {
    if (activeError && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { x: 0 },
        {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(buttonRef.current, { x: 0, duration: 0.1 });
          },
        }
      );
    }
  }, [activeError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailError(null);
    setSendError(null);

    const now = Date.now();

    // 1. Check Success Cooldown (1 Hour)
    const lastSuccess = localStorage.getItem("lastContactSuccess");
    if (lastSuccess && now - parseInt(lastSuccess) < SUCCESS_COOLDOWN) {
      const minsLeft = Math.ceil(
        (SUCCESS_COOLDOWN - (now - parseInt(lastSuccess))) / 60000
      );
      setSendError(`Limit reached. Try again in ${minsLeft}m.`);
      setIsSubmitting(false);
      return;
    }

    // 2. Check Validation Cooldown (10 Minutes)
    const lastFail = localStorage.getItem("lastValidationFail");
    const failCount = parseInt(
      localStorage.getItem("validationFailCount") || "0"
    );

    if (
      failCount >= MAX_FAILED_ATTEMPTS &&
      lastFail &&
      now - parseInt(lastFail) < VALIDATION_COOLDOWN
    ) {
      const minsLeft = Math.ceil(
        (VALIDATION_COOLDOWN - (now - parseInt(lastFail))) / 60000
      );
      setSendError(`Too many invalid attempts. Wait ${minsLeft}mins.`);
      setIsSubmitting(false);
      return;
    }

    // --- Verifalia Validation ---
    const verifalia = new VerifaliaRestClient({
      username: process.env.NEXT_PUBLIC_BROWSER_APP_KEY || "",
    });

    try {
      const result = await verifalia.emailValidations.submit(formData.email);
      const entry = result?.entries?.[0];

      if (
        !entry ||
        entry.classification !== "Deliverable" ||
        entry.status !== "Success"
      ) {
        // Track failed validation to protect credits
        const newCount = failCount + 1;
        localStorage.setItem("validationFailCount", newCount.toString());
        localStorage.setItem("lastValidationFail", now.toString());

        setEmailError(t.contact.sentError || "Invalid email address");
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      setEmailError("Verification service unavailable.");
      setIsSubmitting(false);
      return;
    }

    // --- EmailJS Sending ---
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      // Reset fails and set success cooldown
      localStorage.setItem("lastContactSuccess", now.toString());
      localStorage.setItem("validationFailCount", "0");

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (error) {
      setSendError("Server error. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-12 md:py-20 px-4 md:px-8 border-b border-black"
    >
      {/* ... Title and info sections same as before ... */}

      <div className="mb-8 md:mb-16 overflow-hidden">
        <h2 className="contact-title font-serif text-[18vw] md:text-[15vw] text-black leading-none">
          {t.contact.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Side Info (Simplified for brevity, keep your original markup here) */}
        <div className="space-y-8">
          <p className="font-sans text-[11px] md:text-[12px] text-black max-w-md">
            {t.contact.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="contact-form space-y-6">
          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] uppercase block mb-2">
              {t.contact.name} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-transparent border-b-2 border-black py-3 focus:outline-none focus:border-brutal-lime transition-all"
            />
          </div>

          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] uppercase block mb-2">
              {t.contact.email} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setEmailError(null);
                setSendError(null);
              }}
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-all ${
                activeError
                  ? "border-brutal-red"
                  : "border-black focus:border-brutal-lime"
              }`}
            />
          </div>

          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] uppercase block mb-2">
              {t.contact.message} *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-transparent border-2 border-black p-3 focus:outline-none focus:border-brutal-lime resize-none"
            />
          </div>

          <div className="form-field">
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full md:w-auto overflow-hidden px-8 py-4 font-sans text-[10px] tracking-widest uppercase transition-colors ${
                isSubmitting
                  ? "bg-white text-brutal-red"
                  : activeError
                  ? "bg-brutal-red text-white"
                  : submitted
                  ? "bg-brutal-lime text-black"
                  : "bg-white text-brutal-red hover:bg-brutal-lime hover:text-black border border-black"
              }`}
            >
              <div className="flex items-center justify-center min-w-[160px] min-h-[1.5em]">
                {isSubmitting ? (
                  <span className="animate-spin mr-2">/</span>
                ) : activeError ? (
                  <div className="relative overflow-hidden w-full h-[1.2em]">
                    <span className="animate-marquee whitespace-nowrap absolute left-0">
                      {activeError} &nbsp;&nbsp;&nbsp; {activeError}{" "}
                      &nbsp;&nbsp;&nbsp; {activeError}
                    </span>
                  </div>
                ) : submitted ? (
                  <div className="relative overflow-hidden w-full h-[1.2em]">
                    <span className="animate-marquee whitespace-nowrap absolute left-0">
                      {t.contact.sent} &nbsp;&nbsp;&nbsp; {t.contact.sent}{" "}
                      &nbsp;&nbsp;&nbsp; {t.contact.sent}
                    </span>
                  </div>
                ) : (
                  <span>{t.contact.send} →</span>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 5s linear infinite;
        }
      `}</style>
    </section>
  );
}
