const express = require('express');
const { v4: uuidv4, validate: isUuid } = require('uuid');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

const logRequests = (request, response, next) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  //1
  console.time(logLabel);

  //2 executa a next e todo seu conteúdo e, somente aí loga o final do tempo
  next();

  //3
  console.timeEnd(logLabel);
};

const validateProjectId = (request, response, next) => {
  const { id } = request.params;

  return !isUuid(id)
    ? response.status(400).json({ error: 'Invalid project ID.' })
    : next();
};

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };

  projects.push(project);
  //exibimos o recurso recem criado
  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    return response.status(400).json({ error: 'Project now found.' });
  }

  const project = { title, owner };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1);

  //para delete, nao enviamos nada, somente uma resp em branco com status 204
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});
