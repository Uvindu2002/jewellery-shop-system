import React, { useState } from 'react';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Typography, Box, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import contactUsImage from '../Images/coverc.png'; // Adjust path as needed

function ContactUs() {
  const [open, setOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all items. Please contact us for more details.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'You can change or cancel your order within 24 hours of purchase. Please contact our support for assistance.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to many countries. Shipping costs will vary based on location.',
    },
    {
      question: 'How do I return an item?',
      answer: 'To return an item, please contact our customer support to receive a return authorization and instructions.',
    },
  ];

  const handleClickOpen = (faq) => {
    setSelectedFAQ(faq);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFAQ(null);
  };

  return (
    <Box sx={{ backgroundColor: '#FAF2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Image at the top with fade-in animation */}
      <Box
        component="img"
        src={contactUsImage}
        alt="Contact Us"
        sx={{
          width: '100%',
          height: 'auto',
          animation: 'fadeIn 1s ease-in-out', // Apply fade-in animation
        }}
      />
      
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 5 }}>
        
        {/* Contact Form with slide-in animation */}
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
            marginBottom: '30px',
            animation: 'slideIn 0.5s ease-in-out', // Slide-in animation
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Send Us a Message
          </Typography>
          <Box component="form" sx={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Name" variant="outlined" fullWidth required sx={styles.inputFocus} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" variant="outlined" fullWidth required sx={styles.inputFocus} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  sx={styles.inputFocus}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#F8B9B7',
                    color: '#fff',
                    paddingY: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* FAQ Section with slide-in animation */}
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: '100%',
            animation: 'slideIn 0.5s ease-in-out', // Slide-in animation
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Box key={index} sx={{ marginBottom: '15px' }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ cursor: 'pointer', color: '#007bff', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => handleClickOpen(faq)}
              >
                {faq.question}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* FAQ Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedFAQ?.question}</DialogTitle>
          <DialogContent>
            <Typography>{selectedFAQ?.answer}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </Box>
  );
}

const styles = {
  socialLink: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    transition: 'color 0.3s, transform 0.3s',
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline',
      transform: 'scale(1.1)',
    },
  },
  contactLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background 0.3s, transform 0.3s',
    '&:hover': {
      background: 'linear-gradient(to right, #2575fc, #6a11cb)',
      transform: 'scale(1.05)',
    },
  },
  inputFocus: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#007bff',
      },
      '&:hover fieldset': {
        borderColor: '#0056b3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0056b3',
        boxShadow: '0 0 0 4px rgba(0,123,255,0.2)',
      },
    },
  },
  faqItem: {
    cursor: 'pointer',
    color: '#007bff',
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline',
    },
  },
  dialogContent: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
};

export default ContactUs;
