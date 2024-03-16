import { useState } from "react";
import { useToastContext } from "../context/toastContext";

interface DogImageResponse {
  status: string;
  message: string;
}

export const useGetImage = () => {
  const [dogImageURL, setDogImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastContext();

  const getImageUrl = (selectedBreed: string) => {
    setLoading(true);
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then((response) => response.json())
      .then((data: DogImageResponse) => {
        console.log(data.message);
        setLoading(false);
        setDogImageURL(data.message);
        // toast("Successfully Loaded Dog Image URL");
      })
      .catch((err) => {
        console.log(err);
        toast("Error occurred");
        setLoading(false);
        setDogImageURL("");
      });
  };

  return { dogImageURL, loading, getImageUrl };
};
