import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navigation />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
