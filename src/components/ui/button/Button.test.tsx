import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TEST_IDS } from "../../../constants";
import Button from "./Button";

const renderComponent = (onClick: () => void) =>
  render(
    <Button type="submit" onClick={onClick}>
      Submit
    </Button>
  );

describe("<Button />", () => {
  test("should render the component", () => {
    renderComponent(vi.fn());

    const elem = screen.getByTestId(TEST_IDS.BUTTON);
    expect(elem).toBeInTheDocument();
  });

  test("should call callback", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderComponent(onClick);

    const elem = screen.getByTestId(TEST_IDS.BUTTON);
    await user.click(elem);

    expect(onClick).toHaveBeenCalled();
  });
});
