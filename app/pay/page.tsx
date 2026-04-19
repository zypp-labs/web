"use client";

import { ExpandableScreenTrigger, ExpandableScreen, ExpandableScreenContent } from '@/components/expandable-screen'
import FeatureCarousel from '@/components/feature-carousel'
import { NavBar } from '@/components/sections/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useId } from 'react'
import { motion } from 'framer-motion'
import { Spinner } from '@/components/ui/spinner'
import SpotlightCards from '@/components/pay-grid';
import MinimalCard, { MinimalCardDescription, MinimalCardImage, MinimalCardTitle } from '@/components/minimal-card';

const Page = () => {
    const nameId = useId()
    const emailId = useId()
    const messageId = useId()

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
    const [feedbackMsg, setFeedbackMsg] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const response = await fetch("/api/pay-waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setFeedbackMsg("You're on the list! We'll be in touch.");
                setName(""); setEmail(""); setMessage("");
            } else {
                setStatus("error");
                setFeedbackMsg(data.error || "Failed to join waitlist.");
            }
        } catch (error) {
            setStatus("error");
            setFeedbackMsg("Something went wrong. Please try again.");
        }
    };

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
        <ExpandableScreen>
            <div className='max-w-screen overflow-x-hidden bg-[#e7ffe2] min-h-screen flex flex-col items-center'>
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className='fixed top-4 z-10 w-[90%] md:w-2/3 h-11 md:h-12 flex items-center justify-between px-2 pl-6 md:pl-6 rounded-full bg-[#cbfac2]'
                >
                    <Image
                        src="/pay-logo.svg"
                        width={57}
                        alt='Pay'
                        height={500}
                        className='w-12 md:w-[57px]'
                    />
                    <ExpandableScreenTrigger> <button className="bg-[#A1DC95] py-1.5 md:py-2 px-4 md:px-5 text-sm md:text-md font-semibold tracking-tight hover:bg-[#9fd596] hover:scale-103 active:scale-97 transition-all duration-200 rounded-full text-[#163617]">Join waitlist</button></ExpandableScreenTrigger>
                </motion.div>
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
                <ExpandableScreenContent className="bg-[#A1DC95] tracking-tight">
                    <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
                        <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
                                Reserve your spot
                            </h2>
                            <div className="space-y-4 sm:space-y-6 pt-4">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <title>Icon</title>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                                            Get exclusive test access to the mobile app before
                                            public release.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <title>Icon</title>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                                            Join a community of early adopters and help influence our
                                            product roadmap.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-primary-foreground/20">
                                <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground leading-[150%] mb-4">
                                    The mobile app is available for hackathon judges. Joining the waitlist would be giving you a chance to have it too.
                                </p>
                                {/* <div className="flex items-center gap-3 sm:gap-4">
                                    <Image
                                        src="/placeholder.svg?height=48&width=48"
                                        alt="Alex Rivera"
                                        width={48}
                                        height={48}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-base sm:text-lg lg:text-xl text-primary-foreground">
                                            Alex Rivera
                                        </p>
                                        <p className="text-sm sm:text-base text-primary-foreground/70">
                                            Early Access Member
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <Label
                                        htmlFor={nameId}
                                        className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                                    >
                                        FULL NAME *
                                    </Label>
                                    <Input
                                        type="text"
                                        id={nameId}
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={emailId}
                                        className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                                    >
                                        EMAIL *
                                    </Label>
                                    <Input
                                        type="email"
                                        id={emailId}
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={messageId}
                                        className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                                    >
                                        WHAT ARE YOU MOST EXCITED ABOUT?
                                    </Label>
                                    <Textarea
                                        id={messageId}
                                        name="excited-about"
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={status === "loading"}
                                        placeholder="Tell us what features you're looking forward to..."
                                        className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                                    />
                                </div>

                                {status === "success" && (
                                    <div className="text-[#163617] bg-[#cbfac2] p-3 rounded-lg text-sm font-medium text-center">
                                        {feedbackMsg}
                                    </div>
                                )}
                                {status === "error" && (
                                    <div className="text-red-900 bg-red-200/50 p-3 rounded-lg text-sm font-medium text-center">
                                        {feedbackMsg}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full px-8 py-2.5 flex gap-2 items-center justify-center rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-primary-foreground/90 transition-colors tracking-[-0.03em] h-10 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" && <Spinner className="w-4 h-4 text-[#A1DC95]" />}
                                    {status === "loading" ? "Joining waitlist..." : "Join waitlist"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </ExpandableScreenContent>
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
        </ExpandableScreen>

    )
}

export default Page