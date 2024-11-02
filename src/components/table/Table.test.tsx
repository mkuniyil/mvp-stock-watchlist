import { screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { TEST_IDS } from "../../constants";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import { generateMessages, renderWithProviders } from "../../utils/testUtils";
import Table from "./Table";

vi.mock("../../hooks/useWebSocketContext", () => ({
  useWebSocketContext: vi.fn(),
}));

const renderComponent = () => renderWithProviders(<Table />);

describe("Table", () => {
  test("should render list of cards with messages", () => {
    const length = 10;
    (useWebSocketContext as Mock).mockReturnValue({
      messages: generateMessages(length),
      unsubscribe: vi.fn(),
    });
    renderComponent();

    const elem = screen.getAllByTestId(TEST_IDS.TABLE_ROW);
    expect(elem).toHaveLength(length);
  });

  test("should render empty table if no messages", () => {
    (useWebSocketContext as Mock).mockReturnValue({
      messages: new Map(),
      unsubscribe: vi.fn(),
    });
    renderComponent();

    const elem = screen.getByText("No data available");
    expect(elem).toBeInTheDocument();
  });
});
