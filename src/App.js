import { Heading } from "./components/Heading";
import { Loader } from "./components/Loader";
import { Images } from "./components/Images";
import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;
function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetchImages()
  }, [page]);

  const fetchImages = useCallback(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=100`)
      .then((res) => {
        const data = res.data;
        const downloadUrls = data.map((item) => item.download_url);
        setImages((prevImages) => [...prevImages, ...downloadUrls]);
        setPage((prevPage) => prevPage + 1);
      });
  }, [page]);
  return (
    <>
      <GlobalStyle />
      <Heading />
     

      <InfiniteScroll dataLength={images.length}
      next={fetchImages}
      hasMore={true}
      loader={<Loader/>}
      >
        <WrapperImages>
          {images.map((imageUrl, index) => (
            // <img key={index} src={imageUrl} />
            <Images url={imageUrl} />
          ))}
        </WrapperImages>
      </InfiniteScroll>
    </>
  );
}

export default App;
