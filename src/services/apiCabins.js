import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. create the cabin;
  //https://dhzumtcqlyktwmpbioub.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 1. create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  //2. upload image

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
