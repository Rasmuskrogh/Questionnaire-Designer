import Button from "../components/Button";
import classes from "./skeleton.module.css";

function SkeletonQuestionnaire() {
  return (
    <form className={classes.skeletonForm}>
      <label className={classes.skeletonHeaderLabel}>Choose a title:</label>
      <div className={classes.skeletonHeaderInput}>
        <div className={classes.skeletonText}></div>
      </div>
      <div className={classes.skeletonInputsWrapper}>
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
      </div>
      <div className={classes.skeletonRadioWrapper}>
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />
          <div className={classes.skeletonInputs}>
            <div className={classes.skeletonText}></div>
          </div>
        </div>
        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />
          <div className={classes.skeletonInputs}>
            <div className={classes.skeletonText}></div>
          </div>
        </div>
        <div className={classes.skeletonRadioDiv}>
          <input type="radio" disabled />
          <div className={classes.skeletonInputs}>
            <div className={classes.skeletonText}></div>
          </div>
        </div>
      </div>
      <div className={classes.skeletonInputsWrapper}>
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
      </div>
      <div className={classes.skeletonRadioDiv}>
        <input type="checkbox" disabled />
        <div className={classes.skeletonInputs}>
          <div className={classes.skeletonText}></div>
        </div>
      </div>
      <div className={classes.skeletonAddInput}>Add input +</div>

      <div>
        <Button className={classes.saveFormButton} label="Save form" />
        <Button className={classes.clearFormButton} label="Clear form" />
      </div>
    </form>
  );
}

export default SkeletonQuestionnaire;
