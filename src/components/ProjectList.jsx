import React from 'react';
import styles from './ProjectList.module.css';

const ProjectList = ({ projects, onSearch, onDelete }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search projects"
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <li key={project.id} className={styles.projectItem}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(project.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;