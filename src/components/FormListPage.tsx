import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "../css/formList.module.css";
import { getAllForms } from "../request";

interface FormListItem {
  id: string;
  title: string;
  created_at: string;
}

function FormsListPage() {
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadForms() {
      try {
        const formsData = await getAllForms();
        setForms(formsData);
      } catch (err) {
        setError("Failed to load forms");
      } finally {
        setLoading(false);
      }
    }
    loadForms();
  }, []);

  return (
    <div className={classes.formsListContainer}>
      <h1>Saved Forms</h1>

      {loading && <div className={classes.loading}>Loading forms...</div>}

      {error && <div className={classes.error}>{error}</div>}

      {!loading && !error && forms.length === 0 && (
        <div className={classes.emptyState}>
          <p>No saved forms found.</p>
        </div>
      )}

      {forms.length > 0 && (
        <div className={classes.formsGrid}>
          {forms.map((form) => (
            <div key={form.id} className={classes.formCard}>
              <h2>{form.title}</h2>
              <p className={classes.formDate}>
                Created: {new Date(form.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className={classes.backButton}>
        Back to Home
      </Link>
    </div>
  );
}

export default FormsListPage;
