import { useState } from "react";
import { useGetBreeds } from "../hooks/useGetBreed";
import { useGetImage } from "../hooks/useGetImage";

export const Main = () => {
  const { breeds, handleGetData } = useGetBreeds();
  const { loading, dogImageURL, getImageUrl } = useGetImage();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = e.target.value.split(" ").reverse().join("/");
    setImageLoading(true);
    getImageUrl(selectedBreed);
  };

  const imageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <>
      <h1>Dog Picture App</h1>
      {breeds.length == 0 && <button onClick={handleGetData}>Get Data</button>}
      <br />
      {breeds.length > 0 && (
        <select onChange={handleChange}>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      )}
      <br />
      {(loading || imageLoading) && <p>Dog Image Loading</p>}
      {!loading && dogImageURL && (
        <img
          style={{ marginTop: "50px" }}
          width="400px"
          onLoad={imageLoaded}
          src={dogImageURL}
          hidden={imageLoading}
        />
      )}
    </>
  );
};
