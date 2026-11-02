'use client'

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface FAQItem {
  id: string
  question: string
  answer: string
}

interface TextRevealFAQsProps {
  items?: FAQItem[]
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  supportText?: string
  supportLinkText?: string
  supportLinkHref?: string
  className?: string
}

export const BlurredStagger = ({
  text,
}: {
  text: string
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012,
      },
    },
  }

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-sm sm:text-base leading-relaxed break-words whitespace-normal text-[#515978] font-normal"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.22 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}

export default function TextRevealFAQs({
  items,
  eyebrow = "FAQ",
  title = <>Questions, <em>answered</em></>,
  description = "Everything you need to know about Suffix IT products, services and technical engagements.",
  supportText = "Can’t find what you’re looking for? Reach out to our",
  supportLinkText = "Suffix IT consultation team",
  supportLinkHref = "#contact",
  className,
}: TextRevealFAQsProps) {
  const defaultItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What does Suffix IT do?',
      answer: 'Suffix IT is a software and ICT solution company in Dhaka. We build ready products such as Field Force, Rupantar HCM and ERP, and develop custom web and mobile software.',
    },
    {
      id: 'faq-2',
      question: 'Can I try Field Force before buying?',
      answer: 'Yes. Request a demo and our team will show you the web dashboard and mobile app with your own use case.',
    },
    {
      id: 'faq-3',
      question: 'Do you build custom software?',
      answer: 'Yes. We build websites, mobile apps and business systems from scratch, or extend the products you already use.',
    },
    {
      id: 'faq-4',
      question: 'Do you offer hosting and support after launch?',
      answer: 'Yes. We provide domain, cloud hosting, storage, backup and ongoing maintenance.',
    },
  ]

  const faqItems = items || defaultItems
  const [activeItem, setActiveItem] = React.useState<string>(faqItems[0]?.id || "")

  return (
    <div className={cn("w relative z-10 px-4 sm:px-6 lg:px-8", className)}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-start">
        {/* Left Side: Brand Typography & Direct Advisory Callout */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          {eyebrow && (
            <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-black tracking-wider uppercase bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17162a] tracking-tight leading-[1.15]">
            {title}
          </h2>
          {description && (
            <p className="text-[#515978] mt-4 text-base sm:text-lg leading-relaxed font-normal max-w-md">
              {description}
            </p>
          )}

          {/* Consultation Box in Glassmorphism */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_rgba(0,114,188,0.07)]">
            <div className="flex items-center gap-2 mb-2 text-[#0072bc] font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-ping" />
              Direct Support &amp; Advisory
            </div>
            <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-4">
              {supportText}{' '}
              <Link
                href={supportLinkHref}
                className="text-[#0072bc] font-bold underline hover:text-[#005c99] transition-colors"
              >
                {supportLinkText}
              </Link>{' '}
              for instant assistance and project scoping.
            </p>
            <Link
              href={supportLinkHref}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#0072bc] text-white hover:bg-[#005c99] transition-all shadow-md shadow-[#0072bc]/20"
            >
              <span>Speak with an Architect</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Hover-Activated Expanding Glassmorphism FAQ Cards */}
        <div className="lg:col-span-7">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={(val) => setActiveItem(val)}
            className="flex flex-col gap-3.5 sm:gap-4"
          >
            {faqItems.map((item, idx) => {
              const isOpen = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item.id)}
                  className="w-full"
                >
                  <AccordionItem
                    value={item.id}
                    className={cn(
                      "group rounded-2xl px-5 sm:px-6 transition-all duration-300",
                      "backdrop-blur-xl border",
                      isOpen
                        ? "bg-white/95 border-[#0072bc]/50 shadow-[0_12px_36px_rgba(0,114,188,0.12)] ring-1 ring-[#0072bc]/30 scale-[1.01]"
                        : "bg-white/65 border-white/80 hover:bg-white/90 hover:border-[#0072bc]/30 shadow-[0_4px_20px_rgba(0,35,75,0.04)]"
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "!bg-transparent !border-none !shadow-none !outline-none py-4 sm:py-5 text-left text-base sm:text-lg font-bold transition-colors hover:no-underline",
                        isOpen ? "text-[#0072bc]" : "text-[#17162a] group-hover:text-[#0072bc]",
                        "[&>svg]:text-[#0072bc] [&>svg]:transition-transform [&>svg]:duration-300"
                      )}
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span
                          className={cn(
                            "text-xs font-mono font-bold transition-colors",
                            isOpen ? "text-[#0072bc]" : "text-[#8ba1ba] group-hover:text-[#0072bc]"
                          )}
                        >
                          0{idx + 1}
                        </span>
                        <span className="leading-snug">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-1 border-t border-[#0072bc]/10 mt-1 text-[#515978]">
                      <BlurredStagger text={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
