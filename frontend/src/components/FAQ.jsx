import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { faqItems } from "../mock";

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            QUESTIONS?
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-[12px] shadow-[0_2px_12px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden"
            >
              <AccordionTrigger
                className="px-6 py-[20px] text-left font-bold text-[#0F172A] text-[14px] hover:no-underline [&>svg]:text-[#9CA3AF] [&>svg]:w-[18px] [&>svg]:h-[18px]"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="px-6 pb-[20px] pt-0 text-[14px] leading-[1.6] text-[#64748B]"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;