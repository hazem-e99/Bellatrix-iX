import React, { useState, useEffect } from "react";

const PayrollContactModal = ({ title, subtitle, onClose, isOpen }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/payroll.json");
        const data = await response.json();
        setDefaultData({
          title: "Contact Us",
          subtitle: "Let's discuss your payroll needs",
        });
      } catch (error) {
        console.error("Failed to load payroll data:", error);
        setDefaultData({
          title: "Contact Us",
          subtitle: "Let's discuss your payroll needs",
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = {
    title: title || defaultData?.title || "Contact Us",
    subtitle:
      subtitle || defaultData?.subtitle || "Let's discuss your payroll needs",
  };

  // Debug logging for real-time updates
  console.log("🎯 [PayrollContactModal] Component received data:", {
    hasPropsData: !!(title || subtitle),
    propsData: { title, subtitle },
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString()
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg-primary)] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            {displayData.title}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          >
            ✕
          </button>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {displayData.subtitle}
        </p>
        {/* Contact form would go here */}
        <div className="text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Contact form placeholder
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollContactModal;
