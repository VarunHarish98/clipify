import supabase from "./superbase";

export const getUrls = async (user_id) => {
  console.log(user_id);
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id );
  if (error) {
    console.log(error);
    return "No Urls present - Glitch at our end";
  }
  return data;
};
