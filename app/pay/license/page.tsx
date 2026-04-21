"use client";

import { PayWaitlist } from '@/components/pay-waitlist';
import { motion } from 'framer-motion';

const sections = [
  { title: "1. License Grant", body: `Zypp Labs grants you a limited, non-exclusive, non-transferable, revocable license to use Zypp Pay solely for personal, evaluation, and non-commercial purposes.` },
  { title: "2. Restrictions", body: `You agree not to: copy, reproduce, or distribute the Application without authorization; modify or create derivative works without permission; use the Application for unlawful or unauthorized purposes; or reverse engineer or exploit the Application beyond its intended use. All rights not expressly granted are reserved by Zypp Labs.` },
  { title: "3. Ownership", body: `All intellectual property rights in the Application, including code, design, and branding, remain the exclusive property of Zypp Labs.` },
  { title: "4. Handling of User Funds", body: `Zypp Pay is a strictly non-custodial application. At no point does Zypp Labs take custody, control, or possession of user funds. All assets remain under the exclusive control of users through their personal wallets. Transactions facilitated by Zypp Pay are generated locally on the user's device, authorized using the user's private keys, and broadcast to blockchain networks without intermediary custody. Zypp Labs does not store or access private keys or seed phrases, execute transactions without user authorization, or intercept, redirect, or reverse transactions.` },
  { title: "5. User Responsibility for Funds", body: `Users are fully responsible for securing their wallets, devices, and credentials; verifying all transaction details prior to submission; and any loss resulting from incorrect inputs, unauthorized access, or misuse. All blockchain transactions are irreversible once executed.` },
  { title: "6. No Custodial or Fiduciary Relationship", body: `Use of Zypp Pay does not establish any custodial, fiduciary, or financial relationship between the user and Zypp Labs.` },
  { title: "7. Disclaimer of Warranties", body: `The Application is provided "as is" without warranties of any kind, including reliability, availability, or fitness for a particular purpose.` },
  { title: "8. Limitation of Liability", body: `Zypp Labs shall not be responsible for any loss of funds, damages, or claims arising from user error or negligence, wallet compromise or security breaches, blockchain or network failures, or third-party service disruptions.` },
  { title: "9. Termination", body: `This license may be terminated at any time if you violate its terms. Upon termination, you must cease all use of the Application.` },
];

export default function LicensePage() {
  return (
    <PayWaitlist>
      <div className='max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center'>
        <div className='w-full max-w-3xl px-6 md:px-8 mt-32 md:mt-40 pb-24'>
          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='text-xs font-mono text-[#163617]/50 uppercase tracking-widest mb-4'>Legal</motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }} className='text-[#163617] font-semibold text-4xl md:text-6xl tracking-tighter mb-3'>License Agreement</motion.h1>
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
