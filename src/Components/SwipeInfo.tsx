import SwipeIcon from '@mui/icons-material/Swipe';

const SwipeInfo = () => {
  return (
    <div className="swipe-info">
      <div>
        <span className="x-swipe-indicator">
          <SwipeIcon className="x-hand fa fa-hand-pointer-o" />
        </span>
      </div>
      <div className="x-swipe-msg">Swipe to Explore</div>
    </div>
  );
};

export default SwipeInfo;
