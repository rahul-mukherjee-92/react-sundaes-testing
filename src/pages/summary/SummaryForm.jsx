import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const chkboxLabel = (
    <span>
      I agree to the <span style={{ color: "blue" }}>terms and conditions</span>
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
