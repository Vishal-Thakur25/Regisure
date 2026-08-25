'use client';

import React, { createContext, useContext, useState } from 'react';
import { ConsultationModal } from './ConsultationModal';

interface ConsultationContextType {
  openConsultation: (serviceName?: string) => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openConsultation = (serviceName?: string) => {
    if (typeof serviceName === 'string') {
      setSelectedService(serviceName);
    } else {
      setSelectedService(undefined);
    }
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
  };

  return (
    <ConsultationContext.Provider value={{ openConsultation, closeConsultation }}>
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={closeConsultation}
        defaultService={selectedService}
      />
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    return {
      openConsultation: () => {},
      closeConsultation: () => {},
    };
  }
  return context;
};
