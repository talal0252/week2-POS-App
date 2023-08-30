import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const CustomBox = styled(Box)(() => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  width: '100%',
  background: '#fff',
  padding: 25,
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
}));

export default CustomBox;
