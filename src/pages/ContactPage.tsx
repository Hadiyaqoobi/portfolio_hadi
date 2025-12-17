import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navigation />
      
      <main className="relative z-10 pt-20">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
