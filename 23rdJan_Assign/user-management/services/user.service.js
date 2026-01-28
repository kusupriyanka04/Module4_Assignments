import { supabase } from "../config/supabase.js";

export const createUserService = async (data) => {
  const { name, email, password, age, role } = data;

  // Check duplicate email
  const { data: exists } = await supabase
    .from("users2")
    .select("*")
    .eq("email", email)
    .single();

  if (exists) throw new Error("Email already registered");

  const { data: user, error } = await supabase
    .from("users2")
    .insert([{ name, email, password, age, role }])
    .select()
    .single();

  if (error) throw error;

  return user;
};

export const getUsersService = async () => {
  const { data, error } = await supabase.from("users2").select("*");
  if (error) throw error;
  return data;
};

export const getUserByIdService = async (id) => {
  const { data, error } = await supabase.from("users2").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const updateUserService = async (id, payload) => {
  const { data, error } = await supabase.from("users2").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteUserService = async (id) => {
  const { error } = await supabase.from("users2").delete().eq("id", id);
  if (error) throw error;
  return true;
};
