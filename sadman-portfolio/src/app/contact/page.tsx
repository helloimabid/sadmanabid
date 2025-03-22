import { personalInfo } from "@/data/portfolio-data";
import AnimatedSection from "@/components/ui/animated-section";
import ContactForm from "@/components/ui/contact-form";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import MotionButton from "@/components/ui/motion-button";
import AnimatedBackground from "@/components/ui/animated-background";

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground quantity={20} staticity={50} color="#7c3aed" />

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-lg text-muted-foreground">
              Interested in working together? Feel free to contact me for any project or collaboration.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <AnimatedSection
                direction="left"
                variant="slide"
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-muted-foreground">
                    Feel free to reach out to me through any of these channels. I'll get back to you as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">{personalInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <FaEnvelope size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <FaPhoneAlt size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">Available upon request</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                  <div className="flex gap-3">
                    <MotionButton
                      href={personalInfo.socialLinks.github}
                      variant="outline"
                      size="icon"
                      isExternal
                    >
                      <FaGithub size={20} />
                    </MotionButton>
                    <MotionButton
                      href={personalInfo.socialLinks.linkedin}
                      variant="outline"
                      size="icon"
                      isExternal
                    >
                      <FaLinkedin size={20} />
                    </MotionButton>
                    <MotionButton
                      href={personalInfo.socialLinks.twitter}
                      variant="outline"
                      size="icon"
                      isExternal
                    >
                      <FaTwitter size={20} />
                    </MotionButton>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection
                direction="right"
                variant="slide"
              >
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thanks for stopping by! Whether you have a project in mind or just want to say hello, I'd love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
