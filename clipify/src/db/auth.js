import { SUPABASE_STORAGE_PATH } from "@/constants/constants";
import supabase, { supabaseUrl } from "./superbase";

const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
};

// Get the user auth from local storage, can be changed to from DB
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
};

export const signUpUser = async ({ email, password, profile_pic, name }) => {
  //Need to check for type of name
  let fileName = `dp-${name}-${Math.random()}`;
  let { error: uploadError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);
  if (uploadError) throw new Error(uploadError?.message);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        profile_pic: `${supabaseUrl}${SUPABASE_STORAGE_PATH}${fileName}`,
        name,
      },
    },
  });
  if (error) throw new Error(error?.message);
  return data;
};

export default login;
