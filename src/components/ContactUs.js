
import { Mail, MapPin, Phone, User, MessageSquare } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function ContactUs() {
  const { language } = useLanguage();
  const t = (en, ar) => (language === "en" ? en : ar);

  return (
   <section id="contact" className="max-w-6xl mx-auto px-6 py-16 dark:text-white ">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-6">
            {t("Get in Touch", "تواصل معنا")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t(
              "We'd love to hear from you. Reach out to us using the form or through the contact information below.",
              "يسعدنا تواصلكم معنا. يمكنكم مراسلتنا عبر النموذج أو من خلال معلومات التواصل أدناه."
            )}
          </p>

          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="text-red-600 mt-1" />
              <span>{t("Benghazi, Libya", "بنغازي، ليبيا")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="text-red-600 mt-1" />
              <a href="mailto:info@economicplatform.ly" className="hover:underline">
                info@economicplatform.ly
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-red-600 mt-1" />
              <a href="tel:+218912345678" className="hover:underline">
                +218 91 234 5678
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Contact Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-4 w-full"
        >
          {/* Web3Forms config */}
          <input
            type="hidden"
            name="access_key"
            value="7dbfb693-bce1-4942-8cdc-db0072915164"
          />
          <input
            type="hidden"
            name="subject"
            value="New message from Economic Platform contact form"
          />
          <input
            type="hidden"
            name="from_name"
            value="Economic Platform Website"
          />

          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              required
              placeholder={t("Your Name", "الاسم الكامل")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              placeholder={t("Your Email", "البريد الإلكتروني")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              required
              placeholder={t("Your Message", "نص الرسالة")}
              rows="4"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            {t("Send Message", "إرسال الرسالة")}
          </button>
        </form>
      </div>
    </section>
  );
}
