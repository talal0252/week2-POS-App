import React from 'react';
import { Modal } from '@mui/material';
import PropTypes from 'prop-types';
import MainForm from '../MainForm';
import CustomBox from './Modal.styles';

function Form({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <CustomBox>
        <MainForm />
      </CustomBox>
    </Modal>
  );
}

Form.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Form;
