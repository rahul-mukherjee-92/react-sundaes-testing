import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { AlertBanner } from "../common/AlertBanner";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [optionTotals, updateItemCount] = useOrderDetails();

  // call api
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((resp) => setItems(resp.data))
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ImgComp = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ImgComp
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total {optionTotals.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
