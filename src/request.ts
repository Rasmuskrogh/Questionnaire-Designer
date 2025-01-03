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
