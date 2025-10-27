import React, { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import ProgressBar from './components/ProgressBar';
import PatientDetails from './sections/PatientDetails';
import GeneralInfo from './sections/GeneralInfo';
import MenstrualCycle from './sections/MenstrualCycle';
import PhysicalSymptoms from './sections/PhysicalSymptoms';
import Ultrasound from './sections/Ultrasound';
import ClinicalParameters from './sections/ClinicalParameters';
import { submitFormData } from './utils/apiService';
import './styles/App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const sections = [
    { id: 0, title: 'Patient Personal Details', component: PatientDetails },
    { id: 1, title: 'General Information', component: GeneralInfo },
    { id: 2, title: 'Menstrual Cycle Characteristics', component: MenstrualCycle },
    { id: 3, title: 'Physical Symptoms', component: PhysicalSymptoms },
    { id: 4, title: 'Morphology on Ultrasound', component: Ultrasound },
    { id: 5, title: 'Clinical Parameters', component: ClinicalParameters }
  ];

  const updateFormData = (sectionData) => {
    setFormData(prev => ({ ...prev, ...sectionData }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitFormData(formData);
      setSubmissionStatus({ type: 'success', message: 'Data submitted successfully! Patient ID: ' + formData.patientId });
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({});
        setCurrentSection(0);
        setSubmissionStatus(null);
      }, 5000);
    } catch (error) {
      setSubmissionStatus({ type: 'error', message: 'Failed to submit data. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>PCOS Clinical Data Collection System</h1>
        <p>Confidential Medical Data Collection Platform</p>
      </header>

      <div className="app-content">
        <NavigationSidebar 
          sections={sections}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        
        <main className="main-content">
          <ProgressBar 
            currentSection={currentSection}
            totalSections={sections.length}
          />
          
          <div className="form-section">
            <h2>{sections[currentSection].title}</h2>
            <CurrentSectionComponent 
              data={formData}
              updateData={updateFormData}
            />
          </div>

          <div className="form-navigation">
            <button 
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="nav-btn prev-btn"
            >
              Previous
            </button>
            
            {currentSection < sections.length - 1 ? (
              <button 
                onClick={handleNext}
                className="nav-btn next-btn"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="nav-btn submit-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Data'}
              </button>
            )}
          </div>

          {submissionStatus && (
            <div className={`status-message ${submissionStatus.type}`}>
              {submissionStatus.message}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;