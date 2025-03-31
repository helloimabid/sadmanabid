"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AnimatedSection from "@/components/ui/animated-section"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError(null)

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      )

      if (result.status !== 200) {
        throw new Error("Failed to send message")
      }

      setIsSending(false)
      setIsSent(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSent(false)
      }, 5000)
    } catch (err) {
      setIsSending(false)
      setError("Something went wrong. Please try again later.")
      console.error("Error submitting form:", err)
    }
  }

  // Animation variants
  const formControls = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
      },
    }),
  }

  return (
    <AnimatedSection direction="up" variant="slide" className="w-full max-w-2xl mx-auto">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border/40 shadow-lg"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Get In Touch</h3>
          <p className="text-muted-foreground mt-2">I'm always interested in new projects and opportunities.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-destructive/10 text-destructive p-4 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-500/10 text-green-500 p-4 rounded-lg"
          >
            Your message has been sent successfully! I'll get back to you soon.
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={formControls} initial="initial" animate="animate" custom={0}>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className={cn(
                "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none",
                "bg-background/30 backdrop-blur-sm text-foreground",
                "transition-colors duration-200",
              )}
            />
          </motion.div>

          <motion.div variants={formControls} initial="initial" animate="animate" custom={1}>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={cn(
                "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none",
                "bg-background/30 backdrop-blur-sm text-foreground",
                "transition-colors duration-200",
              )}
            />
          </motion.div>
        </div>

        <motion.div variants={formControls} initial="initial" animate="animate" custom={2}>
          <label className="block text-sm font-medium mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject of your message"
            value={formData.subject}
            onChange={handleChange}
            required
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none",
              "bg-background/30 backdrop-blur-sm text-foreground",
              "transition-colors duration-200",
            )}
          />
        </motion.div>

        <motion.div variants={formControls} initial="initial" animate="animate" custom={3}>
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={cn(
              "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none",
              "bg-background/30 backdrop-blur-sm text-foreground",
              "transition-colors duration-200 resize-none",
            )}
          />
        </motion.div>

        <motion.div
          className="flex justify-center"
          variants={formControls}
          initial="initial"
          animate="animate"
          custom={4}
        >
          <Button
            type="submit"
            disabled={isSending || isSent}
            className="w-full sm:w-auto min-w-[200px] relative overflow-hidden group"
          >
            <span
              className={cn(
                "inline-block transition-all duration-200 transform",
                isSending ? "opacity-0" : "opacity-100",
              )}
            >
              Send Message
            </span>

            {isSending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-foreground transition-all duration-300 group-hover:w-full" />
          </Button>
        </motion.div>
      </form>
    </AnimatedSection>
  )
}

