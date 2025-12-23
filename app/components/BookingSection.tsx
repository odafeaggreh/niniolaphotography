export default function BookingSection() {
  return (
    <section id="contact" className="py-[120px] bg-bg-secondary px-6">
      <div className="max-w-[800px] mx-auto text-center">
         <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl text-white font-serif mb-6">
            Let's Create Something Beautiful
          </h2>
          <p className="text-text-secondary mb-12">
            Ready to book a session? Fill out the form below and I'll get back to you within 24 hours.
          </p>

          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-white text-sm mb-2">Name</label>
                    <input type="text" className="w-full bg-transparent border border-white/20 rounded-sm p-4 text-white focus:border-accent-gold focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-white text-sm mb-2">Email</label>
                    <input type="email" className="w-full bg-transparent border border-white/20 rounded-sm p-4 text-white focus:border-accent-gold focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>
            </div>
            
             <div>
                <label className="block text-white text-sm mb-2">Service Type</label>
                 <select className="w-full bg-bg-primary border border-white/20 rounded-sm p-4 text-white focus:border-accent-gold focus:outline-none transition-colors appearance-none">
                    <option>Portrait Session</option>
                    <option>Event Coverage</option>
                    <option>Commercial</option>
                    <option>Other</option>
                 </select>
            </div>

            <div>
                <label className="block text-white text-sm mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border border-white/20 rounded-sm p-4 text-white focus:border-accent-gold focus:outline-none transition-colors" placeholder="Tell me about your project..."></textarea>
            </div>

            <button type="submit" className="w-full bg-accent-gold text-black font-bold py-4 rounded-sm hover:bg-accent-hover transition-colors uppercase tracking-widest text-sm">
                Send Message
            </button>
          </form>
      </div>
    </section>
  );
}
