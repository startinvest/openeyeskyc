import React, { useState } from 'react';
import Step1 from '../Step1';
import Step2 from '../Step2';
import 'bootstrap/dist/css/bootstrap.min.css';


const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    // Handle the final submission
  };

  switch (step) {
    case 1:
      return <Step1 onNext={nextStep} />;
    case 2:
      return <Step2 onBack={prevStep} onSubmit={handleSubmit} />;
    default:
      return <Step1 onNext={nextStep} />;
  }
};

export default MultiStepForm;
