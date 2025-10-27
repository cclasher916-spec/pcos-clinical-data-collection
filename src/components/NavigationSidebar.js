import React from 'react';

const NavigationSidebar = ({ sections, currentSection, setCurrentSection }) => {
  return (
    <nav className="navigation-sidebar">
      <h3>Form Sections</h3>
      <ul className="section-list">
        {sections.map((section, index) => (
          <li 
            key={section.id}
            className={`section-item ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
            onClick={() => setCurrentSection(index)}
          >
            <div className="section-icon">
              {index < currentSection ? (
                <span className="completed">✓</span>
              ) : (
                <span className="pending">○</span>
              )}
            </div>
            <span className="section-title">{section.title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSidebar;