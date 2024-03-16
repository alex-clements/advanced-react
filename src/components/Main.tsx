import { useState } from "react";

// Interface defining response type for API listing dog breeds
interface DogsListResponse {
  status: string;
  message: {
    [key: string]: string[];
  };
}

// Interface defining response type for API providing dog image URL
interface DogImageResponse {
  status: string;
  message: string;
}

export const Main = () => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  // Callback function to execute when select dropdown is changed
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = e.target.value.split(" ").reverse().join("/");
    setImageLoading(true);
    getImageUrl(selectedBreed);
  };

  // Callback function to execute after image has finished loading
  const imageLoaded = () => {
    setImageLoading(false);
  };

  // State defining list of dog breeds
  const [breedsList, setBreedsList] = useState<string[]>([]);

  // Function fetching dog breed list, transforming response into a format
  // we can work with
  const getBreedsList = () => {
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
        setBreedsList([" ", ...breeds]);
      });
  };

  // State defining image URL
  const [imageUrl, setImageUrl] = useState<string>("");

  // State indicating image URL is being fetched from API
  const [imageUrlLoading, setImageUrlLoading] = useState<boolean>(false);

  // Function to retrieve image URL from from API for selected dog breed
  const getImageUrl = (selectedBreed: string) => {
    setImageUrlLoading(true);
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then((response) => response.json())
      .then((data: DogImageResponse) => {
        console.log(data.message);
        setImageUrlLoading(false);
        setImageUrl(data.message);
      })
      .catch((err) => {
        console.log(err);
        setImageUrlLoading(false);
      });
  };

  return (
    <>
      <h1>Dog Picture App</h1>
      {breedsList.length == 0 && (
        <button onClick={getBreedsList}>Get Data</button>
      )}
      <br />
      {breedsList.length > 0 && (
        <select onChange={handleSelectChange}>
          {breedsList.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      )}
      <br />
      {(imageUrlLoading || imageLoading) && <p>Dog Image Loading</p>}
      {!imageUrlLoading && imageUrl && (
        <img
          style={{ marginTop: "50px" }}
          width="400px"
          onLoad={imageLoaded}
          src={imageUrl}
          hidden={imageLoading}
        />
      )}
    </>
  );
};
