import { ToastContainer as Toast } from 'react-toastify';

export default function ToastContainer() {
    return (
        <Toast
            position="bottom-center"
            autoClose={500}
            limit={1}
            hideProgressBar={true}
            theme="dark"
            newestOnTop
            closeOnClick
        />
    );
}
