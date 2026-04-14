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
    <section id="faq" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            Questions?
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg" style={{ color: "#9CA3AF" }}>
            Everything you need to know about working with Panoptyc
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <AccordionTrigger
                className="px-6 py-5 text-left font-semibold text-white hover:no-underline"
                style={{ fontSize: "1rem" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{ color: "#9CA3AF" }}
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
