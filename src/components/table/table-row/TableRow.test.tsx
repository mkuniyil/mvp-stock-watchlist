import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TEST_IDS } from "../../../constants";
import TableRow from "./TableRow";

const renderComponent = (onDelete: () => void) =>
  render(
    <table>
      <tbody>
        <TableRow
          title="test"
          price="100"
          onDelete={onDelete}
          percentage={0}
          ask="0"
          bid="0"
        />
      </tbody>
    </table>
  );

describe("TableRow", () => {
  test("should render", () => {
    renderComponent(vi.fn());

    expect(screen.getByTestId(TEST_IDS.TABLE_ROW)).toBeInTheDocument();
  });

  test("should call onDelete method", async () => {
    const onDeleteMock = vi.fn();
    renderComponent(onDeleteMock);
    const user = userEvent.setup();

    const row = screen.getByTestId(TEST_IDS.DELETE_BUTTON);
    await user.click(row);

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
