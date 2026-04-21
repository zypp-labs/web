"use client";

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import MinimalCard, { MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from '@/components/minimal-card';
import { PayWaitlist } from '@/components/pay-waitlist';
import { ExpandableScreenTrigger } from '@/components/expandable-screen';

const Page = () => {

    const features = [
        {
            id: 1,
            title: "Offline Payments",
            description:
                "Send and receive payments without internet, with transactions stored locally until connectivity returns.",
            image: "/offline.svg",
        },
        {
            id: 2,
            title: "Gasless Transactions",
            description:
                "Users don’t need to hold SOL. Fees are abstracted, making payments seamless and frictionless.",
            image: "/gasless.svg",
        },
        {
            id: 3,
            title: "Self-Custodial by Design",
            description:
                "Private keys stay on the user’s device, ensuring full control over funds at all times.",
            image: "/self-custody.jpg",
        },
        {
            id: 4,
            title: "Async On-Chain Settlement",
            description:
                "Transactions are securely relayed and finalized on-chain once connectivity is restored.",
            image: "/async-settlement.svg",
        },
    ];
    return (
        <PayWaitlist>
            <div className='max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center'>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className='font-poppins text-[#163617] font-semibold text-4xl md:text-5xl lg:text-7xl tracking-tighter mt-34 md:mt-40 text-center px-4 md:px-0'
                >
                    Spend your stablecoins even <br className="hidden md:block" /> without a stable internet!
                </motion.h1>
                <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className='text-center font-medium text-sm md:text-md text-[#163617] tracking-tight leading-tight my-6 px-6 md:px-0'
                >
                    Zypp Pay lets you send and receive money even offline. <br className="hidden md:block" /> Users should have access, as much as control, over their finance.
                </motion.p>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ExpandableScreenTrigger> <button className="bg-[#A1DC95] py-2 px-5 text-md font-semibold tracking-tight hover:bg-[#9fd596] hover:scale-103 active:scale-97 transition-all duration-200 rounded-full text-[#163617]">Join waitlist</button></ExpandableScreenTrigger>
                </motion.div>
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                >
                    <Image
                        src="/pay-hero.svg"
                        width={900}
                        alt='Pay'
                        height={500}
                        className='mt-12 md:mt-20 w-[90%] md:w-[900px] h-auto mx-auto'
                    />
                </motion.div>

                <div className='px-4 md:max-w-4xl flex flex-col items-center justify-center my-32 overflow-hidden'>
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className='font-poppins text-[#163617] font-semibold text-4xl tracking-tighter my-8'
                    >
                        Features
                    </motion.h1>
                    <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ perspective: 1000 }}
                            >
                                <MinimalCard className="h-full">
                                    <MinimalCardImage src={feature.image} alt={feature.title} />
                                    <MinimalCardTitle>{feature.title}</MinimalCardTitle>
                                    <MinimalCardDescription>
                                        {feature.description}
                                    </MinimalCardDescription>
                                </MinimalCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, rotateX: 15, y: 150, scale: 0.95 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
                    style={{ perspective: 1200 }}
                    className='bg-[#A1DC95] w-full overflow-hidden origin-bottom'
                >
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <Image
                            width={1000}
                            height={500}
                            src="/zypp-pay-banner.jpg"
                            className='lg:hidden w-full object-cover'
                            alt="Zypp Pay banner mobile"
                        />
                        <Image
                            width={6000}
                            height={500}
                            src="/zypp-pay-banner-large.jpg"
                            className='hidden lg:block w-full object-cover'
                            alt="Zypp Pay banner desktop"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </PayWaitlist>

    )
}

export default Page