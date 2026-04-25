"use client";
import { useState } from 'react';
import { Phone, MapPin, Clock, Send, Mail } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#004795] mb-4 uppercase tracking-tight">
            Get in Touch
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-20 h-2 bg-[#E31E24] rounded-full"></div>
            <div className="w-8 h-2 bg-[#004795] rounded-full"></div>
          </div>
          <p className="text-xl text-slate-600 font-medium">Start Your Child's Journey Today</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information Side */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">
              <h3 className="text-2xl font-bold text-[#004795] mb-8 flex items-center gap-3">
                Contact Information
              </h3>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-[#004795]/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#004795] transition-colors duration-300">
                    <Phone className="w-6 h-6 text-[#004795] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#004795] font-bold text-lg mb-1">Phone</h4>
                    <a href="tel:+250788510446" className="text-slate-600 hover:text-[#E31E24] font-medium transition-colors">
                      +250 788 510 446
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-[#E31E24]/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E31E24] transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-[#E31E24] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#004795] font-bold text-lg mb-1">Location</h4>
                    <p className="text-slate-600 font-medium">KG 653 St, Kigali, Rwanda</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-[#004795]/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#004795] transition-colors duration-300">
                    <Clock className="w-6 h-6 text-[#004795] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#004795] font-bold text-lg mb-1">School Hours</h4>
                    <div className="text-slate-600 font-medium space-y-1">
                      <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                      <p className="text-[#E31E24]">Sat - Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.503463836173!2d30.0891!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTYnMzguOCJTIDMwwrAwNScyMC44IkU!5e0!3m2!1sen!2srw!4v1620000000000!5m2!1sen!2srw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
            <h3 className="text-2xl font-bold text-[#004795] mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#004795] font-bold mb-2 text-sm uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#004795] focus:bg-white outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#004795] font-bold mb-2 text-sm uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#004795] focus:bg-white outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#004795] font-bold mb-2 text-sm uppercase tracking-wider">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#004795] focus:bg-white outline-none transition-all"
                  placeholder="+250 788 510 446"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#004795] font-bold mb-2 text-sm uppercase tracking-wider">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#004795] focus:bg-white outline-none transition-all resize-none"
                  placeholder="Tell us about your child's needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#004795] hover:bg-[#003366] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3 group"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}