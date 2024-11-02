import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { expect } from "vitest";
import { TEST_IDS } from "../../../constants";
import Alert from "./Alert";

const renderComponent = (children: ReactNode) =>
  render(<Alert>{children}</Alert>);

describe("<Alert />", () => {
  test("should render the component", () => {
    renderComponent("Alert");

    const elem = screen.getByTestId(TEST_IDS.ALERT);
    expect(elem).toBeInTheDocument();
  });
});
