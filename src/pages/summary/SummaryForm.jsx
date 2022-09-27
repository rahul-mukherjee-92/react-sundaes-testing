import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

export const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will be delivered</Popover.Body>
    </Popover>
  );

  const chkboxLabel = (
    <span>
      I agree to the
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>terms and conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <div>
      <Form>
        <Form.Check
          type="checkbox"
          id="terms-chk"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={chkboxLabel}
        />
        <Button type="submit" variant="primary" disabled={!checked}>
          Confirm order
        </Button>
      </Form>
    </div>
  );
};
