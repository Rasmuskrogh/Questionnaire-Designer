import classes from "../css/questionnaire.module.css";
import { ITitleInput } from "../interface";

function TitleInput({ title, setTitle }: ITitleInput) {
  return (
    <div className={classes.questionnaireTitle}>
      <label className={classes.formHeaderLabel}>Choose a title:</label>
      <input
        className={classes.titleInput}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default TitleInput;
