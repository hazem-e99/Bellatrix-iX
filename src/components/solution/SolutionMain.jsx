import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainHR from "./hr/MainHR";
import MainPayroll from "./payroll/MainPayroll";
// import MainFinance from "./finance/MainFinance";
// import MainERP from "./erp/MainERP";
// import MainCRM from "./crm/MainCRM";
// import MainEcommerce from "./ecommerce/MainEcommerce";

// Configuration array for all solutions
const solutionConfig = [
  {
    slug: "hr",
    component: MainHR,
    dataFile: "/data/hr.json",
  },
  {
    slug: "payroll",
    component: MainPayroll,
    dataFile: "/data/payroll.json",
  },

];

function getSolutionFromPath(pathname) {
  const lower = pathname.toLowerCase();
  return solutionConfig.find((sol) => lower.includes(sol.slug));
}

const SolutionMain = ({ data: propsData = null }) => {
  const location = useLocation();
  const [solutionData, setSolutionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const solution = getSolutionFromPath(location.pathname);

  useEffect(() => {
    if (propsData) {
      setSolutionData(propsData);
      setLoading(false);
      console.log("🎯 [SolutionMain] Using props data:", propsData);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);
    setSolutionData(null);

    if (!solution) {
      setError("Solution not found");
      setLoading(false);
      return;
    }

    if (!solution.dataFile) {
      setLoading(false);
      setSolutionData(null);
      return;
    }

    fetch(solution.dataFile)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch solution data");
        return res.json();
      })
      .then((data) => {
        if (!ignore) setSolutionData(data);
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
  }, [location.pathname, solution, propsData]);

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

  if (!solution) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Solution not found</div>
      </div>
    );
  }

  const SolutionComponent = solution.component;

  // If no dataFile, just render the component
  if (!solution.dataFile) {
    return <SolutionComponent />;
  }

  // Pass the fetched data as a prop
  return <SolutionComponent data={solutionData} />;
};

export default SolutionMain;
