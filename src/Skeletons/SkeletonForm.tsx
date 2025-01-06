import classes from "./skeleton.module.css";

function SkeletonForm() {
  return (
    <div className={classes.skeletonformWrapper} >
      <div className={classes.skeletonTitle}></div>
      <label className={classes.skeletonFormLabel}></label>
      <div className={classes.skeletonHeaderInput}>
        <div className={classes.skeletonText}></div>
      </div>
      <div className={classes.skeletonRadioWrapper}>
        <div className={classes.skeletonFormRadioLabel}></div>
        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />

          <div className={classes.skeletonRadioText}></div>
        </div>

        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />

          <div className={classes.skeletonRadioText}></div>
        </div>

        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />

          <div className={classes.skeletonRadioText}></div>
        </div>
      </div>
      <label className={classes.skeletonFormLabel}></label>
      <div className={classes.skeletonHeaderInput}>
        <div className={classes.skeletonText}></div>
      </div>
      <div className={classes.skeletonRadioDiv}>
        <input type="checkbox" disabled />
        <div className={classes.skeletonRadioText}></div>
      </div>
    </div>
  );
}

export default SkeletonForm;
