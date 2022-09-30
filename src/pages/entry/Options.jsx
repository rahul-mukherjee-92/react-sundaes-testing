import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { AlertBanner } from "../common/AlertBanner";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItems = items.map((item) => (
    <ImgComp key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return (
    <div>
      <Row>{optionItems}</Row>
    </div>
  );
};
