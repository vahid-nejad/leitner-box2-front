import AddCard from "components/AddCard";
import { QuestionCard } from "interfaces";
import { NextPage } from "next";
import React from "react";
import { getApi } from "utils/fetchApi";

export async function getServerSideProps({ params }: any) {
  // Fetch data from external API
  if (params.id == "last") {
    const card = await getApi(`/card/getLastCard/last`);
    return { props: { card } };
  }
  const card = await getApi(`/card/${params.id}`);

  // Pass data to the page via props
  return { props: { card } };
}

interface IProps {
  card: QuestionCard;
}
const EditProduct: NextPage<IProps> = ({ card }) => {
  return <AddCard editingCard={card}></AddCard>;
};

export default EditProduct;
