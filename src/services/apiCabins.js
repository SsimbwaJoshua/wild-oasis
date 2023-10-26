import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. create/edit the cabin;
  let query = supabase.from("cabins");
  //A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B.EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  //2. upload image
  if (hasImagePath) return data;

  const { error: storageerror } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.DELETE cabin if error occurs while uploading the image
  if (storageerror) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageerror);
    throw new Error(
      "cabins image could not be created and cabin was not created"
    );
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}
