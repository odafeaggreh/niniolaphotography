import ContactForm from "./ContactForm";

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

          <div className="text-left">
            <ContactForm />
          </div>
      </div>
    </section>
  );
}
