import "./styles/rotateScreen.css";

import {
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../Utils/userStore';


interface InfoProps {
  open:boolean;
  setOpen: (state:boolean) => void;
}

const Info = ({ open, setOpen }:InfoProps) => {
  const { logOutUser, isLoggedIn } = useAuth();

  const onClickCloseBtn = (e:any) => {
    e.preventDefault();
    e.stopPropagation();

    setOpen(false);
  }
  
  const onClickLogout = (e:any) => {
    e.preventDefault();
    e.stopPropagation();

    logOutUser();
    setOpen(false);
  }


  return (
    <Dialog open={open} className="settings_popup">
        <DialogTitle display='flex' alignItems='center' justifyContent='space-between' >
          <Typography>Welcome to Framefolio</Typography>
          <IconButton onClick={onClickCloseBtn} >
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Explore the experience of a 3D world with Framefolio, your gateway
            to an immersive image gallery! Navigate seamlessly by sliding across
            the screen or using the joystick controls. To add your personal
            touch, just click on any image to upload your own pictures.
            Remember, you'll need to be logged into your Google account for image
            uploads. Immerse yourself in this interactive environment and make
            Framefolio uniquely yours!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={3} >
            <Grid item xs={6} display={'flex'} justifyContent={'center'} >
              <IconButton>
                <MusicOffIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'center'}  >
              <IconButton>
                <VolumeOffIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={12} >
              {isLoggedIn &&
                <Button
                fullWidth
                variant='contained'
                onClick={onClickLogout} >
                  Logout
                </Button>}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
  )
}

export default Info