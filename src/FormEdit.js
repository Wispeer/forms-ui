import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forms/${id}`)
      .then(response => setForm(response.data))
      .catch(error => console.error('Error fetching form:', error));
  }, [id]);

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index].text = e.target.value;
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const updatedQuestions = [...form.questions, { text: newQuestion }];
      setForm({ ...form, questions: updatedQuestions });
      setNewQuestion('');
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/forms/${id}`, form)
      .then(response => {
        console.log('Form updated:', response.data);
        navigate('/'); 
      })
      .catch(error => console.error('Error updating form:', error));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        style={{ marginBottom: '20px' }}
      >
        Back
      </Button>
      <Typography variant="h4" gutterBottom>Edit Form</Typography>
      <TextField
        label="Form Title"
        value={form.title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" gutterBottom>Questions</Typography>
      <List>
        {form.questions.map((question, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <TextField
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e)}
                  fullWidth
                />
              }
            />
            <IconButton onClick={() => handleDeleteQuestion(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddQuestion}
        style={{ marginTop: '10px' }}
      >
        Add Question
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Save Form
      </Button>
    </Container>
  );
}

export default FormEdit;
