import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { TEST_IDS } from "../../../constants";
import Input from "./Input";

const renderComponent = (onChange: () => void) =>
  render(<Input value="" placeholder="" onChange={onChange} required />);

describe("<Input />", () => {
  test("should render the component", () => {
    renderComponent(vi.fn());

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    expect(elem).toBeInTheDocument();
  });
});
