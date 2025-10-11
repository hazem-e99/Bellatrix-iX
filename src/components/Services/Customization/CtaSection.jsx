import React from "react";
import { smartRender } from "../../../utils/htmlSanitizer";
import CTAButton from "../../CTAButton";

const CtaSection = ({ title, subtitle, buttonText }) => {
  // Check if title contains HTML and render accordingly
  const titleHTML = smartRender(title);
  const subtitleHTML = smartRender(subtitle);

  return (
    <section className="py-16 bg-[var(--color-primary-dark)] text-[var(--color-text-inverse)] text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          {...(titleHTML
            ? { dangerouslySetInnerHTML: titleHTML }
            : { children: title })}
        />
        <p
          className="text-lg md:text-xl mb-8"
          {...(subtitleHTML
            ? { dangerouslySetInnerHTML: subtitleHTML }
            : { children: subtitle })}
        />
        <CTAButton
          variant="primary"
          size="lg"
          className="rounded-xl shadow-lg hover:scale-105"
          modalConfig={{
            title: "NetSuite Customization Consultation",
            subtitle: "Let's discuss your customization needs and requirements",
            icon: "⚙️"
          }}
        >
          {buttonText}
        </CTAButton>
      </div>
    </section>
  );
};

export default CtaSection;
