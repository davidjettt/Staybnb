import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBackdrop() {


    return (
        <div>
            <Backdrop
                sx={{ color: 'rgb(230, 30, 77)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
