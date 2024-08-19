import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, List, ListItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function FormDetail() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/forms/${id}`)
      .then(response => setForm(response.data))
      .catch(error => console.error('Error fetching form:', error));
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!form) {
    return <div>Loading...</div>;
  }

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
      <Typography variant="h4" gutterBottom>
        {form.title}
      </Typography>
      <List>
        {form.questions.map((question, index) => (
          <ListItem key={index}>
            {question.text}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default FormDetail;
