import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormCreator from './FormCreator';
import FormList from './FormList';
import FormDetail from './FormDetail'
import FormEdit from './FormEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/create" element={<FormCreator />} />
        <Route path="/forms/:id" element={<FormDetail />} />
        <Route path="/forms/:id/edit" element={<FormEdit />} /> {" - Edited -"}
      </Routes>
    </Router>
  );
}

export default App;
