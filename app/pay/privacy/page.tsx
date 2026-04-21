"use client";

import { PayWaitlist } from '@/components/pay-waitlist';
import { motion } from 'framer-motion';

const sections = [
  { title: "1. Introduction", body: `This Privacy Policy explains how Zypp Pay collects, uses, and handles information when you use the Application.` },
  { title: "2. Information Collected", body: `We may collect limited, non-sensitive information necessary for operation, including: public wallet addresses, transaction metadata such as timestamps and status, and basic application usage data for performance monitoring.` },
  { title: "3. Information Not Collected", body: `Zypp Pay does not collect, store, or have access to private keys, seed phrases, or wallet credentials or authentication secrets. All sensitive cryptographic operations are performed locally on the user's device.` },
  { title: "4. Use of Information", body: `Collected information is used solely to facilitate transaction creation and broadcasting, improve application functionality and performance, and diagnose and resolve technical issues.` },
  { title: "5. Data Minimization and Storage", body: `We limit data collection to what is strictly necessary. Any stored data is minimal and used only for operational or debugging purposes.` },
  { title: "6. Third-Party Services", body: `Zypp Pay may interact with third-party services, including blockchain networks and Remote Procedure Call (RPC) providers. These third parties may process data in accordance with their own policies. Zypp Labs does not control their practices.` },
  { title: "7. Security", body: `We implement reasonable safeguards to protect information. However, no system can guarantee complete security.` },
  { title: "8. User Control", body: `Users may discontinue use of the Application at any time. Since Zypp Pay is non-custodial, users retain full control over their wallets and digital assets.` },
  { title: "9. Changes to Policy", body: `We may update this Privacy Policy from time to time. Continued use of the Application constitutes acceptance of any changes.` },
];

export default function PrivacyPage() {
  return (
    <PayWaitlist>
      <div className='max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center'>
        <div className='w-full max-w-3xl px-6 md:px-8 mt-32 md:mt-40 pb-24'>
          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='text-xs font-mono text-[#163617]/50 uppercase tracking-widest mb-4'>Legal</motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }} className='text-[#163617] font-semibold text-4xl md:text-6xl tracking-tighter mb-3'>Privacy Policy</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className='text-xs text-[#163617]/40 font-mono mb-6'>Effective Date: April 21, 2026</motion.p>
          <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className='w-16 h-1 bg-[#A1DC95] rounded-full mb-10' />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }} className='space-y-8'>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className='text-[#163617] font-semibold text-base tracking-tight mb-2'>{s.title}</h2>
                <p className='text-[#163617]/70 text-sm leading-relaxed'>{s.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </PayWaitlist>
  );
}
