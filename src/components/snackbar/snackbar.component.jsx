import ReactDOM from 'react-dom';

const SnackBar = ({ message }) => {
  return ReactDOM.createPortal(
    <div>{message}</div>,
    document.querySelector('#snackbar')
  );
};

export default SnackBar;
