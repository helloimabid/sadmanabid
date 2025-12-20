"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        y: 100,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".form-field", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are missing");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        email: formData.email, // Matches {{email}} in your template
        reply_to: formData.email,
        to_name: "Sadman Abid",
        message: formData.message,
        subject: `New message from ${formData.name}`, // Matches {{subject}} in your template
      };

      // console.log("Sending EmailJS with params:", templateParams);

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error: any) {
      console.error("Failed to send email:", error);
      if (error?.text?.includes("recipients address is empty")) {
        alert(
          "Configuration Error: Please check your EmailJS Email Template settings. Ensure the 'To Email' field contains a valid email address or variable."
        );
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-12 md:py-20 px-4 md:px-8 border-b border-black"
      suppressHydrationWarning
    >
      <div className="mb-8 md:mb-16 overflow-hidden">
        <h2 className="contact-title font-serif text-[18vw] md:text-[15vw] text-black leading-none">
          {t.contact.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-8">
          <div className="form-field">
            <p className="font-sans text-[11px] md:text-[12px] leading-relaxed text-black max-w-md">
              {t.contact.description}
            </p>
          </div>

          <div className="form-field space-y-4">
            <div>
              <p className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase mb-1">
                {t.contact.email}
              </p>
              <a
                href="mailto:me@sadmanabid.me"
                className="font-sans text-[12px] md:text-[14px] text-black hover:text-brutal-lime transition-colors"
              >
                me@sadmanabid.me
              </a>
            </div>
            <div>
              <p className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase mb-1">
                {t.contact.location}
              </p>
              <p className="font-sans text-[12px] md:text-[14px] text-black">
                {t.contact.locationValue}
              </p>
            </div>
          </div>

          <div className="form-field hidden md:block">
            <div className="w-32 h-32 border border-black relative">
              <div className="absolute inset-2 border border-black/50" />
              <div className="absolute inset-4 border border-black/30" />
              <span className="absolute bottom-2 left-2 font-mono text-[8px] text-black/50">
                COORD_23.81°N
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form space-y-6">
          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase block mb-2 group-focus-within:text-brutal-lime transition-colors">
              {t.contact.name} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-transparent border-b-2 border-black py-3 font-sans text-[14px] md:text-[16px] text-black placeholder:text-black/30 focus:outline-none focus:border-brutal-lime focus:pl-4 transition-all duration-300"
              placeholder={t.contact.namePlaceholder}
            />
          </div>

          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase block mb-2 group-focus-within:text-brutal-lime transition-colors">
              {t.contact.email} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-transparent border-b-2 border-black py-3 font-sans text-[14px] md:text-[16px] text-black placeholder:text-black/30 focus:outline-none focus:border-brutal-lime focus:pl-4 transition-all duration-300"
              placeholder={t.contact.emailPlaceholder}
            />
          </div>

          <div className="form-field group">
            <label className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase block mb-2 group-focus-within:text-brutal-lime transition-colors">
              {t.contact.message} *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-transparent border-2 border-black p-3 font-sans text-[14px] md:text-[16px] text-black placeholder:text-black/30 focus:outline-none focus:border-brutal-lime focus:bg-black/5 transition-all duration-300 resize-none"
              placeholder={t.contact.messagePlaceholder}
            />
          </div>

          <div className="form-field">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative bg-white text-brutal-red px-8 py-4 font-sans text-[10px] md:text-[12px] tracking-widest uppercase hover:bg-brutal-lime hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {t.contact.sending}
                </span>
              ) : submitted ? (
                t.contact.sent
              ) : (
                `${t.contact.send} →`
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute top-4 md:top-8 right-4 md:right-8 hidden md:block">
        <p className="font-sans text-[10px] text-black tracking-widest">
          +(Contact)_..
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />
      </div>
    </section>
  );
}
