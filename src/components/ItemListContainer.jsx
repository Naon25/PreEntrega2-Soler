import ItemList from "./ItemList";
import Data from "../data.json";
import { useParams } from "react-router-dom";
import { Heading, Center } from "@chakra-ui/react";

const ItemListContainer = () => {
  const { category } = useParams();
  console.log(category);

  const getDatos = () => {
    return new Promise((resolve, reject) => {
      if (Data.length === 0) {
        reject(new Error("No hay datos"));
      }
      setTimeout(() => {
        resolve(Data);
      }, 2000);
    });
  };

  async function fetchingData() {
    try {
      const datosFetched = await getDatos();
    } catch (err) {
      console.log(err);
    }
  }

  fetchingData();

  if (category === undefined) {
    return (
      <div>
        <Center bg="#D6EAF8" h="100px" color="black">
          <Heading as="h2" size="2x1">
            Bikes catalogue
          </Heading>
        </Center>
        <ItemList bikes={Data} />
      </div>
    )
  }else{
    const catFilter = Data.filter((bike) => bike.category === category );
    return(
      <div>
        <Center bg="#D6EAF8" h="100px" color="black">
          <Heading as="h2" sixe="2x1">
            Bikes by Category
          </Heading>
        </Center>
        {catFilter ? <ItemList bikes={catFilter} /> : <ItemList bike={Data} />}
      </div>
    )
  }
};

export default ItemListContainer;