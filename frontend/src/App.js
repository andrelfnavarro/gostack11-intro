import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import api from './services/api';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  const addProject = () => {
    api
      .post('projects', {
        title: `Novo Projeto ${Date.now()}`,
        owner: 'Eduardo Prado',
      })
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]);
      });
  };

  return (
    <>
      <Header title='Projects' />

      <ul>
        {projects.map((project, index) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type='button' onClick={addProject}>
        Adicionar projeto
      </button>
    </>
  );
};

export default App;
