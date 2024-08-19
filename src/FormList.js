import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/forms`)
      .then(response => {
        console.log(response.data);
        setForms(response.data);
      })
      .catch(error => console.error('Error fetching forms:', error));
  }, []);

  return (
    <Container>
      <List>
        {forms.map(form => (
          <ListItem key={form.id}>
            <ListItemText
              primary={<Link to={`/forms/${form.id}`}>{form.title}</Link>}
              secondary={form.questions.map(q => q.text).join(', ')}
            />
            <Button
              variant="contained"
              component={Link} 
              to={`/forms/${form.id}/edit`}
            >
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default FormList;
