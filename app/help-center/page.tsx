import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpCenter = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg-px-8 my-10 z-0 ">
      <section className="mt-4">
        <h3 className="text-[#2d3769] text-3xl text-center font-medium ">
          Help Center
        </h3>
        <div className="mt-10">
          <p className="font-bold app-font ">
            Meridian Travel offers a variety of travel packages, designed to
            meet the expectations of every traveler, according to P.D. 7/2018,
            which harmonizes Greek legislation with Directive (EU) 2015/2302 on
            organized travel and related travel arrangements. This guarantees
            our customers all the rights provided by the EU for travel packages,
            providing full protection and ensuring the correct execution of the
            trips. Meridian Travel is responsible for offering quality travel
            solutions and protecting customers in the event that the company is
            unable to meet its obligations. We encourage our customers to
            familiarize themselves with and comply with the General Conditions
            of Participation which form an integral part of the travel
            agreement. Participation in any of our trips means full and
            unconditional acceptance of these terms. For any need, contact with
            Meridian Travel is available via phone, email and fax, providing
            full support and information about our trips.
          </p>
        </div>
        <div>
          <h3 className="text-[#2d3769] text-3xl text-center font-medium  mt-10">
            Analytics Information
          </h3>
          <div>
            <Accordion
              type="single"
              collapsible
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10"
            >
              <AccordionItem
                value="item-1"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-5"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-6"
                className="border px-4 rounded-2xl bg-[#bae1d6]"
              >
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
