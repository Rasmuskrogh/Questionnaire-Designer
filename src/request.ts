import { createClient } from "@supabase/supabase-js";
import { InputType } from "./types";

// Supabase konfiguration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default-formulär som motsvarar det från db.json
const defaultForm = {
  title: "Default Form",
  inputs: [
    {
      label: "A question",
      input: "Please write an answer",
    },
    {
      type: "radio",
      question: "What's your preference?",
      options: ["This one", "That one ", "The other one"],
    },
    {
      date: "",
      input: "",
      label: "What's todays date?",
    },
    {
      type: "checkbox",
      question: "Do you agree?",
      options: ["Without a doubt!"],
    },
  ],
};

export const saveForm = async (form: {
  title: string;
  inputs: InputType[];
}) => {
  try {
    const { data, error } = await supabase
      .from("forms")
      .insert([
        {
          title: form.title,
          fields: form.inputs,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    console.log("form saved", data[0]);
    return data[0];
  } catch (error) {
    console.error("Error saving form", error);
    throw error;
  }
};

export const getPrefilledForm = async () => {
  try {
    // Hämta det senaste formuläret
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Om inget formulär finns, använd default
      if (error.code === "PGRST116") {
        console.log("No forms found, using default form");
        return defaultForm;
      }
      console.error("Supabase error:", error);
      return defaultForm; // Returnera defaultForm vid alla fel istället för att kasta vidare
    }

    console.log("Form loaded from Supabase:", data.id);
    // Konvertera till det format Questionnaire förväntar sig
    return {
      title: data.title,
      inputs: data.fields || [],
    };
  } catch (error) {
    console.error("Error fetching form data", error);
    // Returnera default-formuläret om något går fel
    return defaultForm;
  }
};

// Funktion som bara returnerar default-formuläret (utan databasanrop)
export const getDefaultForm = () => {
  return { ...defaultForm };
};
export const getAllForms = async () => {
  try {
    const { data, error } = await supabase
      .from("forms")
      .select("id, title, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching forms", error);
    throw error;
  }
};
