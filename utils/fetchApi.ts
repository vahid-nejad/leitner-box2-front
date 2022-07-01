export const BACKEND_ENDPOINT = "http://localhost:8000";

export async function postApi(url: string, data: Object) {
  const response = await fetch(BACKEND_ENDPOINT + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
export async function patchApi(url: string, data: Object) {
  console.log({ url });

  const response = await fetch(BACKEND_ENDPOINT + url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getApi(url: string) {
  const response = await fetch(BACKEND_ENDPOINT + url);

  return await response.json();
}

export function getImageUrl(imgName: string) {
  if (imgName.startsWith("blob")) {
    console.log({ imgName });

    return imgName;
  } else return `${BACKEND_ENDPOINT}/uploads/${imgName}`;
  // return imgName;
}

export async function uploadImages(images: File[], pronounciation?: File) {
  const formData = new FormData();

  if (!images && !pronounciation)
    return {
      pronounciation: "",
      images: [],
    };
  images.forEach((image, index) => {
    formData.append("images", image, image.name);
  });

  pronounciation &&
    formData.append("pronounciation", pronounciation, pronounciation.name);

  const res = await fetch(BACKEND_ENDPOINT + "/card/upload", {
    method: "POST",
    body: formData,
  });
  return await res.json();
}
