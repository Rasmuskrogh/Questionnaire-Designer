import { createClient } from "@supabase/supabase-js";
import { InputType } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.log("No forms found, using default form");
        return defaultForm;
      }
      console.error("Supabase error:", error);
      return defaultForm;
    }

    console.log("Form loaded from Supabase:", data.id);
    return {
      title: data.title,
      inputs: data.fields || [],
    };
  } catch (error) {
    console.error("Error fetching form data", error);
    return defaultForm;
  }
};

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
