import { useState } from "react";
import { useToastContext } from "../context/toastContext";

interface DogsListResponse {
  status: string;
  message: {
    [key: string]: string[];
  };
}

export const useGetBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastContext();

  const handleGetData = () => {
    setLoading(true);
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data: DogsListResponse) => {
        const dogs = data.message;
        const breeds: string[] = [];
        Object.keys(dogs).forEach((dog) => {
          if (dogs[dog].length === 0) {
            breeds.push(dog);
          } else {
            dogs[dog].forEach((subDog) => {
              breeds.push(`${subDog} ${dog}`);
            });
          }
        });
        setBreeds([" ", ...breeds]);
        setLoading(false);
        toast("Successfully Loaded Dog Breeds");
      });
  };

  return { breeds, loading, handleGetData };
};
