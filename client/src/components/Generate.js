import React, { useState, useRef } from 'react';
import Navbar from './Layout/Navbar';
import { useReactToPrint } from 'react-to-print';
import DownloadIcon from '@mui/icons-material/Download';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Sidebar from './Layout/Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const StyledTextBox = () => {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const componentRef = useRef();
  const submittedTextRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => submittedTextRef.current,
  });

  const handleSubmit = () => {
    setSubmittedText(text);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container mt-3">
        <div className="add_btn mb-3">
          <Button variant="contained" color="success" onClick={handlePrint}>
            <DownloadIcon />
          </Button>
        </div>
        <div className="animate-text"><h1 style={{ fontWeight: 400 }}>Generate Cover letter With your Resume </h1> </div>
        <div className="styled-text-box" ref={componentRef}>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="body1" component="div">
                <ReactQuill
                  value={text}
                  onChange={setText}
                  placeholder="Type your cover letter here (maximum 1000 words)"
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link'],
                    ],
                  }}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {text.length}/1000 words
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        {submittedText && (
          <div className="submitted-text-box">
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1" component="div">
                  <div
                    ref={submittedTextRef}
                    dangerouslySetInnerHTML={{ __html: submittedText }} // Renders HTML content
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default StyledTextBox;
