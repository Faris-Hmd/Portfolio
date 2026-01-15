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

import { useLanguage } from "@/lib/LanguageContext";

import { useState } from "react";

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "249966626693";
    const message = `*New Portfolio Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 30 : -30 }}
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
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors text-left rtl:text-right">
                  {t.contact.details.email}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors text-left rtl:text-right">
                  faris.hamad.sd@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 group cursor-pointer">
              <span className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <MapPin className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors text-left rtl:text-right">
                  {t.contact.details.location}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors text-left rtl:text-right">
                  {t.contact.details.locationValue}
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
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors text-left rtl:text-right">
                  {t.contact.details.phone}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors text-left rtl:text-right">
                  +249 966626693
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-border/50 bg-card md:bg-card/50 md:backdrop-blur-sm shadow-xl shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-left rtl:text-right">
                  {t.contact.form.title}
                </CardTitle>
                <CardDescription className="text-left rtl:text-right">
                  {t.contact.form.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        required
                        placeholder={t.contact.form.name}
                        className="rtl:text-right"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        required
                        type="email"
                        placeholder={t.contact.form.email}
                        className="rtl:text-right"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      required
                      placeholder={t.contact.form.subject}
                      className="rtl:text-right"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      required
                      placeholder={t.contact.form.message}
                      className="min-h-[150px] resize-none focus:ring-primary/20 rtl:text-right"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold transition-all active:scale-[0.98]"
                    size="lg"
                  >
                    {t.contact.form.send}
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
