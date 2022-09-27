import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { ScoopOption } from "./ScoopOption";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // call api
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((resp) => setItems(resp.data))
      .catch((err) => {
        // TODP: handle err response
      });
  }, [optionType]);

  // later 'null' to be changed to ToppingOption
  const ImgComp = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ImgComp key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return (
    <div>
      <Row>{optionItems}</Row>
    </div>
  );
};
