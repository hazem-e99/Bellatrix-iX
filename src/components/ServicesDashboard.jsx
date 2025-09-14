import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllServices,
  fetchConsultationServices,
  fetchSupportServices,
  selectAllServices,
  selectConsultationServices,
  selectSupportServices,
  selectServicesErrors,
  selectIsServicesLoading,
  selectHasServicesData,
} from "../store/services/servicesSlice";

const ServicesDashboard = () => {
  const dispatch = useDispatch();
  const all = useSelector(selectAllServices);
  const consultation = useSelector(selectConsultationServices);
  const support = useSelector(selectSupportServices);
  const errors = useSelector(selectServicesErrors);
  const isLoading = useSelector(selectIsServicesLoading);
  const hasData = useSelector(selectHasServicesData);

  useEffect(() => {
    if (!hasData) {
      dispatch(fetchAllServices());
      dispatch(fetchConsultationServices());
      dispatch(fetchSupportServices());
    }
  }, [dispatch, hasData]);

  const handleRetry = (thunk) => {
    dispatch(thunk({ force: true }));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Services Dashboard</h2>
      {isLoading && <div>Loading...</div>}
      <div style={{ margin: "16px 0" }}>
        <h3>All Services</h3>
        {errors.all && (
          <div style={{ color: "red" }}>
            Error: {errors.all}{" "}
            <button onClick={() => handleRetry(fetchAllServices)}>Retry</button>
          </div>
        )}
        <pre>{JSON.stringify(all, null, 2)}</pre>
      </div>
      <div style={{ margin: "16px 0" }}>
        <h3>Consultation Services</h3>
        {errors.consultation && (
          <div style={{ color: "red" }}>
            Error: {errors.consultation}{" "}
            <button onClick={() => handleRetry(fetchConsultationServices)}>
              Retry
            </button>
          </div>
        )}
        <pre>{JSON.stringify(consultation, null, 2)}</pre>
      </div>
      <div style={{ margin: "16px 0" }}>
        <h3>Support Services</h3>
        {errors.support && (
          <div style={{ color: "red" }}>
            Error: {errors.support}{" "}
            <button onClick={() => handleRetry(fetchSupportServices)}>
              Retry
            </button>
          </div>
        )}
        <pre>{JSON.stringify(support, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ServicesDashboard;
