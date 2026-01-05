'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Product: ['Features', 'Technology', 'Specs', 'Accessories'],
    Support: ['Setup Guide', 'Warranty', 'Repairs', 'Contact'],
    Company: ['About', 'Careers', 'Press', 'Privacy'],
    Social: ['Instagram', 'Twitter', 'YouTube', 'LinkedIn'],
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 mb-6 sm:mb-0">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-bold tracking-tighter text-white mb-3 sm:mb-4"
            >
              Zenith X
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-white/60 leading-relaxed"
            >
              Pure sound, engineered to perfection.
            </motion.p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: columnIndex * 0.1 }}
            >
              <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-3 sm:mb-4 tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors touch-manipulation"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 sm:pt-12 pb-6 sm:pb-8 mb-6 sm:mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-white/90 mb-3 sm:mb-4 px-4">
              Stay Updated
            </h4>
            <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 px-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-full text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors touch-manipulation"
              />
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black text-sm sm:text-base font-medium rounded-full hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap touch-manipulation">
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white/40 px-4">
          <p>© 2026 Zenith X. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#privacy" className="hover:text-white/60 transition-colors touch-manipulation">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white/60 transition-colors touch-manipulation">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-white/60 transition-colors touch-manipulation">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
