import React from "react";

import ProdukCard from "./ProdukCard";

function ProdukList({ data }) {
  return (
    <>
      {data?.map((item, index) => (
        <ProdukCard item={item} key={index}/>
      ))}
    </>
  );
}

export default ProdukList;
