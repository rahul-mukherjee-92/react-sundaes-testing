import { Alert } from "react-bootstrap";

export const AlertBanner = ({ variant, msg }) => {
  const alertVariant = variant || "danger";
  const alertMsg =
    msg || "Some unexpected error happened. Please try again later.";

  return <Alert variant={alertVariant}>{alertMsg}</Alert>;
};
