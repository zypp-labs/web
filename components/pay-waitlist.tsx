"use client";

import { ExpandableScreen, ExpandableScreenContent, ExpandableScreenTrigger } from '@/components/expandable-screen';
import { PayNavBar } from '@/components/pay-navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import React, { useId } from 'react';

export const PayWaitlist = ({ children }: { children: React.ReactNode }) => {
    const nameId = useId();
    const emailId = useId();
    const messageId = useId();

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
        } catch {
            setStatus("error");
            setFeedbackMsg("Something went wrong. Please try again.");
        }
    };

    return (
        <ExpandableScreen>
            <PayNavBar>
                <ExpandableScreenTrigger>
                    <button className="bg-[#A1DC95] py-1.5 md:py-2 px-4 md:px-5 text-sm md:text-md font-semibold tracking-tight hover:bg-[#9fd596] hover:scale-103 active:scale-97 transition-all duration-200 rounded-full text-[#163617]">
                        Join waitlist
                    </button>
                </ExpandableScreenTrigger>
            </PayNavBar>
            <ExpandableScreenContent className="bg-[#A1DC95] tracking-tight">
                <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
                    <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
                            Reserve your spot
                        </h2>
                        <div className="space-y-4 sm:space-y-6 pt-4">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <title>Icon</title>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                                        Get exclusive test access to the mobile app before public release.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <title>Icon</title>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                                        Join a community of early adopters and help influence our product roadmap.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-primary-foreground/20">
                            <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground leading-[150%] mb-4">
                                The mobile app is available for hackathon judges. Joining the waitlist would be giving you a chance to have it too.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor={nameId} className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">FULL NAME *</Label>
                                <Input type="text" id={nameId} name="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={status === "loading"} className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
                            </div>
                            <div>
                                <Label htmlFor={emailId} className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">EMAIL *</Label>
                                <Input type="email" id={emailId} name="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={status === "loading"} className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
                            </div>
                            <div>
                                <Label htmlFor={messageId} className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">WHAT ARE YOU MOST EXCITED ABOUT?</Label>
                                <Textarea id={messageId} name="excited-about" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} disabled={status === "loading"} placeholder="Tell us what features you're looking forward to..." className="w-full px-4 py-4 rounded-lg shadow-none bg-white/10 border-2 border-primary-foreground/20 focus:border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
                            </div>
                            {status === "success" && <div className="text-[#163617] bg-[#cbfac2] p-3 rounded-lg text-sm font-medium text-center">{feedbackMsg}</div>}
                            {status === "error" && <div className="text-red-900 bg-red-200/50 p-3 rounded-lg text-sm font-medium text-center">{feedbackMsg}</div>}
                            <Button type="submit" disabled={status === "loading"} className="w-full px-8 py-2.5 flex gap-2 items-center justify-center rounded-full bg-[#163617] text-[#A1DC95] font-medium hover:bg-primary-foreground/90 transition-colors tracking-[-0.03em] h-10 disabled:opacity-70 disabled:cursor-not-allowed">
                                {status === "loading" && <Spinner className="w-4 h-4 text-[#A1DC95]" />}
                                {status === "loading" ? "Joining waitlist..." : "Join waitlist"}
                            </Button>
                        </form>
                    </div>
                </div>
            </ExpandableScreenContent>
            {children}
        </ExpandableScreen>
    );
};
