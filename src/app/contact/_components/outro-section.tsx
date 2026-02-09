"use client";

import Badge from "@/soul/primitives/Badge";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTextReveal } from "@/hooks/useTextReveal";
import { InquiryForm } from "./form";

gsap.registerPlugin(ScrollTrigger);

export function OutroSection() {
  const outroRef = useRef<HTMLElement>(null);
  const formIntroRef = useRef<HTMLParagraphElement>(null);
  const emailBriefingRef = useRef<HTMLParagraphElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useTextReveal(formIntroRef, {
    isReady: true,
    animateOnScroll: true,
    start: "top 80%",
  });

  useTextReveal(emailBriefingRef, {
    isReady: true,
    animateOnScroll: true,
    start: "top 80%",
  });

  useTextReveal(closingRef, {
    isReady: true,
    animateOnScroll: true,
    start: "top 80%",
  });

  useGSAP(
    () => {
      const outro = outroRef.current;
      if (!outro) return;
      
      const leftColumn = outro.querySelector<HTMLElement>(".request");
      const largeChild = outro.querySelector<HTMLElement>(".large-child");


      if (!leftColumn || !largeChild) return;


      const getY = () => leftColumn.clientHeight - largeChild.clientHeight;

      ScrollTrigger.create({
        trigger: leftColumn,
        endTrigger: largeChild,
        pin: true,
        pinSpacing: false,
        start: "top 20%",
        end: "bottom 60%",

      });

      gsap.to(largeChild, {
        y: getY,
        ease: "none",
        scrollTrigger: {
          trigger: leftColumn,
          endTrigger: largeChild,
          start: "top 20%",
          end: "bottom 60%",
          scrub: 1,

        },
      });

      const outroTl = gsap.timeline({
        scrollTrigger: {
          trigger: outro, 
          start: "top 100%", 
          end: "center 100%", 
          scrub: 1, 
          
        },
      });

      outroTl.to(outro, {
        marginLeft: 0,
        marginRight: 0,
        duration: 1,
        ease: "none",
       
      });
    },
    { scope: outroRef, dependencies: [] } 
  );

  return (
    <section
      ref={outroRef}
      className="relative  mt-48 mx-20 bg-white text-black rounded-t-xl transition-[padding] duration-500 overflow-hidden"
    >
      <div className="m-20 p-20 overflow-hidden">
        <div className="vertical-section mx-auto max-w-7xl  ">
          {" "}
          <div className="  grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-10 text-2xl request">
              <Badge variant="outline" size="sm">
                Request a project
              </Badge>
              <h1 className="text-[56px] font-medium pb-4">Hello!</h1>

              <p ref={formIntroRef} data-body-text className="max-w-prose text-zinc-700">
                Contact form? Yes—this makes it easier for all of us. It makes
                your inquiry more concrete and gives us the first important
                reference points for your project.
              </p>
              <p ref={emailBriefingRef} data-body-text className="max-w-prose text-zinc-700">
                For more extensive inquiries you can also send us an{" "}
                <a href="#" className="underline">
                  email
                </a>
                . We'll also gladly provide our{" "}
                <a href="#" className="underline">
                  agency briefing checklist
                </a>
                . It helps you prepare for our initial conversation and to write
                a thoughtful brief, because good briefs are the foundation for
                good results.
              </p>
              <p ref={closingRef} data-body-text className="max-w-prose text-zinc-700">
                Either way, we're excited about your project and look forward to
                hearing more.
              </p>
            </div>

            <div className="large-child m-10">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 -translate-y-1/2 rounded-t-2xl bg-white" />
    </section>
  );
}
