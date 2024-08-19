import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';
import axios from 'axios';

function FormCreator() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']);
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3000/forms', { title, questions })
      .then(response => {
        console.log('Form created:', response.data);
        setTitle('');
        setQuestions(['']);
      })
      .catch(error => console.error('Error creating form:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Form
      </Typography>
      <TextField
        label="Form Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <List>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <TextField
              label={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e)}
              fullWidth
              margin="normal"
            />
            <Button onClick={() => removeQuestion(index)}>Remove</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={addQuestion}>
        Add Question
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: 10 }}>
        Create Form
      </Button>
    </Container>
  );
}

export default FormCreator;
