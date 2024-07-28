import supabase from "./superbase";

export const getClicks = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);
  if (error) return "No Clicks present - Glitch at our end";
  console.log(data)
  return data;
};
