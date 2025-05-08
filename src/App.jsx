import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import './styles/global.css';

const App = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description 1' },
    { id: 2, title: 'Project 2', description: 'Description 2' },
  ]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Apply class to body and persist to localStorage
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleAddProject = (newProject) => {
    const newProjectWithId = { ...newProject, id: Date.now() };
    const updatedProjects = [...projects, newProjectWithId];
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

  const handleSearch = (searchQuery) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const result = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowercasedQuery) ||
        project.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProjects(result);
  };

  return (
    <div className="app">
      <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <h1>Project Showcase</h1>
      <AddProjectForm onAddProject={handleAddProject} />
      <ProjectList
        projects={filteredProjects}
        onSearch={handleSearch}
        onDelete={handleDeleteProject}
      />
    </div>
  );
};

export default App;
