"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative mt-4 overflow-hidden ">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 hidden md:block" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to start your next project?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4 group cursor-pointer">
              <span className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Mail className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Email
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  faris.hamad.sd@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 group cursor-pointer">
              <span className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <MapPin className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Location
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Remote / Worldwide
                </p>
              </div>
            </div>
            <a
              href="tel:+249966626693"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <span className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Phone className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Phone
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  +249 966626693
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-border/50 bg-card md:bg-card/50 md:backdrop-blur-sm shadow-xl shadow-primary/5">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input placeholder="Name" />
                    </div>
                    <div className="space-y-2">
                      <Input type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your Message"
                      className="min-h-[150px] resize-none focus:ring-primary/20"
                    />
                  </div>
                  <Button
                    className="w-full h-12 text-base font-semibold transition-all active:scale-[0.98]"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
