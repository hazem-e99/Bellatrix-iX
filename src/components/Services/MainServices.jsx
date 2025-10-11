import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Implementation from "../Services/Implementation/Implementation";
import Training from "../Services/Training/Training";
import Support from "../Support/Support";
import Customization from "../Services/Customization/Customization";
import IntegrationMain from "../Services/Integration/IntegrationMain";
import NetSuiteConsultingMain from "../Services/NetSuiteConsulting/NetSuiteConsultingMain";

// Add more imports as needed for other service components

const serviceConfig = [
  {
    slug: "implementation",
    component: Implementation,
    dataFile: "/data/Implementation.json",
  },
  {
    slug: "training",
    component: Training,
    dataFile: "/data/training.json",
  },
  {
    slug: "support",
    component: Support,
    dataFile: null, // Support does not use a data file, adjust if needed
  },
  {
    slug: "customization",
    component: Customization,
    dataFile: "/data/customization.json",
  },
  {
    slug: "integration",
    component: IntegrationMain,
    dataFile: "/data/integration-data.json",
  },
  {
    slug: "netsuite-consulting",
    component: NetSuiteConsultingMain,
    dataFile: "/data/netSuiteConsulting.json",
  },
  // Add more services as needed
];

function getServiceFromPath(pathname) {
  // Find the first matching slug in the path
  const lower = pathname.toLowerCase();
  return serviceConfig.find((svc) => lower.includes(svc.slug));
}

const MainServices = ({ data: propsData = null }) => {
  const location = useLocation();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const service = getServiceFromPath(location.pathname);

  useEffect(() => {
    if (propsData) {
      setServiceData(propsData);
      setLoading(false);
      console.log("🎯 [MainServices] Using props data:", propsData);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);
    setServiceData(null);

    if (!service) {
      setError("Service not found");
      setLoading(false);
      return;
    }

    if (!service.dataFile) {
      setLoading(false);
      setServiceData(null);
      return;
    }

    fetch(service.dataFile)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch service data");
        return res.json();
      })
      .then((data) => {
        if (!ignore) setServiceData(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [location.pathname, service, propsData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Service not found</div>
      </div>
    );
  }

  const ServiceComponent = service.component;

  // For Support, which does not use a data file, just render the component
  if (!service.dataFile) {
    return <ServiceComponent />;
  }

  // Pass the fetched data as a prop
  return <ServiceComponent data={serviceData} />;
};

export default MainServices;
