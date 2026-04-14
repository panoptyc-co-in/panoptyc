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
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-red-600 bg-red-50 border border-red-200">
            Questions?
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about working with Panoptyc
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200"
            >
              <AccordionTrigger
                className="px-6 py-5 text-left font-semibold text-slate-900 hover:no-underline"
                style={{ fontSize: "1rem" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="px-6 pb-5 text-sm leading-relaxed text-slate-600"
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
