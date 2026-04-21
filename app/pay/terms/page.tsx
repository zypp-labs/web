"use client";

import { PayWaitlist } from '@/components/pay-waitlist';
import { motion } from 'framer-motion';

const sections = [
  { title: "1. Introduction", body: `These Terms of Use ("Terms") govern your access to and use of Zypp Pay ("the Application"), operated by Zypp Labs ("we", "us", or "our"). By accessing or using the Application, you agree to be bound by these Terms.` },
  { title: "2. Nature of the Service", body: `Zypp Pay is a software application that enables users to create, sign, and broadcast blockchain-based transactions, including in low-connectivity environments. The Application is provided for experimental, testing, and evaluation purposes.` },
  { title: "3. Non-Custodial Design", body: `Zypp Pay is a strictly non-custodial application. At no point does Zypp Labs take custody, control, or possession of user funds. All assets remain under the exclusive control of users through their personal wallets and private keys.` },
  { title: "4. User Responsibilities", body: `You are solely responsible for: maintaining the security and confidentiality of your private keys, wallets, and devices; verifying all transaction recipient addresses and amounts; and ensuring the accuracy of any data entered into the Application. Zypp Labs has no ability to recover lost, misdirected, or compromised funds.` },
  { title: "5. Transaction Processing", body: `Transactions created through Zypp Pay may be subject to delays or failure due to network connectivity limitations, offline transaction queuing, or blockchain congestion or validator conditions. Zypp Labs does not guarantee transaction confirmation, speed, or success.` },
  { title: "6. No Financial Advice", body: `Zypp Pay does not provide financial, investment, or legal advice. All actions performed using the Application are at your own risk.` },
  { title: "7. Availability", body: `The Application may be modified, suspended, or discontinued at any time without notice. We do not guarantee uninterrupted or error-free operation.` },
  { title: "8. Limitation of Liability", body: `To the fullest extent permitted by applicable law, Zypp Labs shall not be liable for any loss or damages arising from user-controlled actions including incorrect transaction details or misuse of the Application, compromise of user wallets or private keys, failures or delays of blockchain networks, or third-party infrastructure including RPC providers. Zypp Labs is responsible solely for the proper functioning of the Application as provided.` },
  { title: "9. Experimental Use", body: `The Application is provided "as is" and "as available" for experimental purposes without warranties of any kind, whether express or implied.` },
  { title: "10. Changes to Terms", body: `We reserve the right to update these Terms at any time. Continued use of the Application constitutes acceptance of the revised Terms.` },
  { title: "11. Governing Law", body: `These Terms shall be governed by and interpreted in accordance with applicable laws in the jurisdiction in which Zypp Labs operates.` },
];

export default function TermsPage() {
  return (
    <PayWaitlist>
      <div className='max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center'>
        <div className='w-full max-w-3xl px-6 md:px-8 mt-32 md:mt-40 pb-24'>
          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='text-xs font-mono text-[#163617]/50 uppercase tracking-widest mb-4'>Legal</motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }} className='text-[#163617] font-semibold text-4xl md:text-6xl tracking-tighter mb-3'>Terms of Service</motion.h1>
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
