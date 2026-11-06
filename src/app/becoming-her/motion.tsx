"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/use-gsap-reveal";

/**
 * Scroll motion for /becoming-her. Renders nothing; it finds its targets by
 * data attribute once the page has mounted.
 *
 * - Hero: as it scrolls away, "Becoming" and "HER" drift apart and the ring
 *   of twenty turns.
 * - The belief field pins on wider screens while its words light up and the
 *   phrase rises into place.
 * - Photographs move inside their frames (parallax).
 * - The six themes come into focus one at a time.
 * - The journey slip prints in from the top.
 *
 * Every effect is transform, opacity or clip-path, and none runs when the
 * visitor asks for reduced motion. Elements that already carry a CSS
 * animation are never targeted, because a running CSS animation overrides
 * the inline transform GSAP writes.
 */
export function BecomingHerMotion() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 768px)",
      },
      (context) => {
        const { motion, wide } = context.conditions as {
          motion: boolean;
          wide: boolean;
        };
        if (!motion) return;

        /* Hero */
        const hero = document.querySelector(".acw-bh-hero");
        if (hero) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.4,
              },
            })
            .to("[data-bh-line='1']", { xPercent: -7, ease: "none" }, 0)
            .to("[data-bh-line='2']", { xPercent: 7, ease: "none" }, 0)
            .to("[data-bh-ring]", { rotate: 150, ease: "none" }, 0)
            .to(
              ".acw-bh-hero-copy, .acw-bh-hero-action",
              { y: -40, opacity: 0, ease: "none" },
              0.15,
            );
        }

        /* The belief field */
        const field = document.querySelector<HTMLElement>(".acw-bh-field");
        if (field) {
          const words = field.querySelectorAll("[data-bh-word]");
          const lines = field.querySelectorAll("[data-bh-phrase] > span > span");
          gsap.set(lines, { yPercent: 110 });

          if (wide) {
            // The phrase rises while the sentence lights up, so the pinned
            // screen is never an empty field.
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: field,
                  start: "top 64px",
                  end: "+=80%",
                  pin: true,
                  scrub: 0.6,
                },
              })
              .to(lines[0], { yPercent: 0, ease: "power2.out", duration: 0.35 }, 0)
              .fromTo(
                words,
                { opacity: 0.15 },
                { opacity: 1, stagger: 0.025, ease: "none", duration: 0.25 },
                0.05,
              )
              .to(lines[1], { yPercent: 0, ease: "power2.out", duration: 0.35 }, 0.4);
          } else {
            gsap.fromTo(
              words,
              { opacity: 0.15 },
              {
                opacity: 1,
                stagger: 0.04,
                ease: "none",
                scrollTrigger: {
                  trigger: field,
                  start: "top 75%",
                  end: "center 45%",
                  scrub: 0.5,
                },
              },
            );
            gsap.to(lines, {
              yPercent: 0,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: field, start: "center 80%", once: true },
            });
          }
        }

        /* Photographs drift inside their frames */
        document
          .querySelectorAll<HTMLElement>("[data-bh-parallax]")
          .forEach((el) => {
            const amount = Number(el.dataset.bhParallax) || 6;
            gsap.fromTo(
              el,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

        /* Themes: the one in the middle of the screen is in focus */
        const list = document.querySelector(".acw-bh-theme-list");
        if (list) {
          list.classList.add("is-focusing");
          list.querySelectorAll("li").forEach((li) => {
            ScrollTrigger.create({
              trigger: li,
              start: "top 62%",
              end: "bottom 38%",
              toggleClass: { targets: li, className: "is-on" },
            });
          });
        }

        /* Journey slip prints in */
        const slip = document.querySelector(".acw-bh-slip");
        if (slip) {
          gsap
            .timeline({
              scrollTrigger: { trigger: slip, start: "top 78%", once: true },
            })
            .fromTo(
              slip,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power2.inOut" },
            )
            .from(
              slip.querySelectorAll("li, .acw-bh-slip-final"),
              { opacity: 0, x: -10, duration: 0.5, stagger: 0.06, ease: "power2.out" },
              0.25,
            );
        }

        return () => {
          document
            .querySelector(".acw-bh-theme-list")
            ?.classList.remove("is-focusing");
        };
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
