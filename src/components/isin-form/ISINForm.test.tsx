import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, Mock, vi } from "vitest";
import { TEST_IDS } from "../../constants";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import { renderWithProviders } from "../../utils/testUtils";
import { ISIN_ERROR } from "./constants";
import ISINForm from "./ISINForm";

vi.mock("../../hooks/useWebSocketContext", () => ({
  useWebSocketContext: vi.fn(),
}));

const renderComponent = () =>
  renderWithProviders(<ISINForm disabled={false} />);

describe("<Form />", () => {
  beforeEach(() => {
    (useWebSocketContext as Mock).mockReturnValue({
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
      messages: new Map([["DE000BASF111", {}]]),
    });
  });

  test("should render the component", () => {
    renderComponent();

    const elem = screen.getByTestId(TEST_IDS.ISIN_FORM);
    expect(elem).toBeInTheDocument();
  });

  test("should show required error if value is empty & do not call the subscribe method", async () => {
    renderComponent();
    const user = userEvent.setup();

    const subscribeButton = screen.getByText("Subscribe");
    await user.click(subscribeButton);

    expect(screen.getByText(ISIN_ERROR.EMPTY_ISIN)).toBeInTheDocument();
    expect(useWebSocketContext().subscribe).not.toHaveBeenCalled();
  });

  test("should show invalid error if value is invalid & do not call the subscribe method", async () => {
    renderComponent();
    const user = userEvent.setup();
    const value = "abcd";

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    await user.type(elem, value);

    const subscribeButton = screen.getByText("Subscribe");
    await user.click(subscribeButton);

    expect(screen.getByText(ISIN_ERROR.INVALID_ISIN)).toBeInTheDocument();
    expect(useWebSocketContext().subscribe).not.toHaveBeenCalled();
  });

  test("should show existing error if value is already subscribed & do not call the subscribe method", async () => {
    renderComponent();
    const user = userEvent.setup();
    const value = "DE000BASF111";

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    await user.type(elem, value);

    const subscribeButton = screen.getByText("Subscribe");
    await user.click(subscribeButton);

    expect(screen.getByText(ISIN_ERROR.EXISTING_ISIN)).toBeInTheDocument();
    expect(useWebSocketContext().subscribe).not.toHaveBeenCalled();
  });

  test("should show existing error if value provided with lower case is already subscribed & do not call the subscribe method", async () => {
    renderComponent();
    const user = userEvent.setup();
    const value = "de000basf111";

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    await user.type(elem, value);

    const subscribeButton = screen.getByText("Subscribe");
    await user.click(subscribeButton);

    expect(screen.getByText(ISIN_ERROR.EXISTING_ISIN)).toBeInTheDocument();
    expect(useWebSocketContext().subscribe).not.toHaveBeenCalled();
  });

  test("should call subscribe method if value is valid", async () => {
    renderComponent();
    const user = userEvent.setup();
    const value = "US000BASF111";

    const elem = screen.getByTestId(TEST_IDS.INPUT);
    await user.type(elem, value);

    const subscribeButton = screen.getByText("Subscribe");
    await user.click(subscribeButton);

    expect(useWebSocketContext().subscribe).toHaveBeenCalledWith(value, true);
  });
});
