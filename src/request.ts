export const saveForm = async (form: { title: string; inputs: any[] }) => {
  try {
    const response = await fetch("http://localhost:5000/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to save form");
    }

    const result = await response.json();
    console.log("form saved", result);
  } catch (error) {
    console.error("Error saving form", error);
    throw error;
  }
};

export const getPrefilledForm = async () => {
  try {
    const response = await fetch("http://localhost:5000/forms/f390");
    if (!response.ok) {
      throw new Error("Failed to load initial form data");
    }
    const formData = await response.json();
    return formData;
  } catch (error) {
    console.error("Error fetching form data", error);
    throw error;
  }
};
