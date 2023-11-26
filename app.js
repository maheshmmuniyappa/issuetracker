const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data (you'd use a database in a real app)
let projects = [];
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home Page - List of Projects
app.get('/', (req, res) => {
    res.render('home', { projects });
});

// Create Project Page
app.get('/create-project', (req, res) => {
    res.render('createProject');
});

app.post('/create-project', (req, res) => {
    const { name, description, author } = req.body;
    const project = { name, description, author, issues: [] };
    projects.push(project);
    res.redirect('/');
});

// Project Detail Page
// Assuming this is inside the route handler for the project detail page
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];
    res.render('projectDetail', { project, projectId }); // Include projectId in the variables passed to the view
});


// Create Issue Page
app.get('/project/:id/create-issue', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];
    res.render('createIssue', { project });
});

app.post('/project/:id/create-issue', (req, res) => {
    const projectId = req.params.id;
    const { title, description, labels, author } = req.body;
    const issue = { title, description, labels: labels.split(','), author };
    projects[projectId].issues.push(issue);
    res.redirect(`/project/${projectId}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
