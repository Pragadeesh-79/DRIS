import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Snackbar } from 'react-native-paper';
import { COLORS } from '../constants/Colors';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const startSimulation = () => {
    setStep(1);
  };

  useEffect(() => {
    if (step === 0) return;

    let timeout1, timeout2;

    const runStep = (msg, nextRoute, nextStep) => {
      setMessage(msg);
      setVisible(true);
      
      timeout1 = setTimeout(() => {
        setVisible(false);
        if (nextRoute) {
          router.push(nextRoute);
        }
        if (nextStep) {
           timeout2 = setTimeout(() => setStep(nextStep), 350); // slight delay to allow route transition
        } else {
           setStep(0); // simulation ends
        }
      }, 2500); // Wait 2.5 seconds per screen
    };

    switch (step) {
      case 1:
        runStep('Heavy rainfall detected.', '/(team)/ai-analysis', 2);
        break;
      case 2:
        runStep('Flood probability: 85%.', null, 3);
        break;
      case 3:
        runStep('Emergency alert sent.', '/(team)/resources', 4);
        break;
      case 4:
        runStep('Rescue teams deployed.', '/(team)/map', 5);
        break;
      case 5:
        runStep('Flood zones and relief camps.', null, null);
        break;
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [step]);

  return (
    <SimulationContext.Provider value={{ startSimulation, step }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2500}
        style={{ backgroundColor: COLORS.critical, bottom: 60 }}
        theme={{ colors: { inverseOnSurface: '#FFFFFF' } }}
      >
        {message}
      </Snackbar>
    </SimulationContext.Provider>
  );
};
