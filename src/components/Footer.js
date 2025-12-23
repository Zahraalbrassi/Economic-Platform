import React from 'react';
import Link from 'next/link';
import { Facebook, X as XIcon, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-red-600">Economic Platform</h2>
          <p className="text-sm">
            A platform providing insights, data, and projects from key economic sectors across Libya.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-red-600 transition">Home</Link></li>
            <li><Link href="#SectorsSection" className="hover:text-red-600 transition">Sectors</Link></li>
            <li><Link href="/reports" className="hover:text-red-600 transition">Reports</Link></li>
            <li><Link href="#contact" className="hover:text-red-600 transition">Contact</Link></li>
            <li><Link href="#about" className="hover:text-red-600 transition">About</Link></li>
          </ul>
        </div>

        {/* Contact Info + Social */}
        <div>
          <h3 className="text-md font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">Email: info@economicplatform.ly</p>
          <p className="text-sm mt-1">Phone: +218-91-1234567</p>

          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-red-600 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-red-600 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" aria-label="X" className="hover:text-red-600 transition">
  <XIcon className="w-5 h-5" />
</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm mt-10 border-t border-gray-300 dark:border-gray-700 pt-4">
        © {new Date().getFullYear()} Economic Platform. All rights reserved.
      </div>
    </footer>
  );
}
