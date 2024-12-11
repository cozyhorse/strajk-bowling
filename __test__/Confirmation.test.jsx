import { beforeAll, afterEach, afterAll, describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Booking from "../src/views/Booking";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Confirmation from "../src/views/Confirmation";
import App from "../src/App";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handler";



describe("Confirmation tests", () => {
  test("Render empty confirmation message ", async () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );
    expect(screen.getByText("Inga bokning gjord!")).toBeDefined();
  });
  
  test("Render a booking", async () => {
    sessionStorage.setItem(
      "confirmation",
      JSON.stringify({
        when: "2024-12-24T21:42",
        id: "12345SUCHCODE",
        lanes: "2",
        people: "4",
        price: 680,
      })
    );
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("When")).toHaveValue("2024-12-24 21:42");
    expect(screen.getByLabelText("Lanes")).toHaveValue("2");
    expect(screen.getByLabelText("Who")).toHaveValue("4");
    expect(screen.queryByText("Total:")).toBeDefined();
    expect(screen.queryByText("1000 sek")).toBeDefined();
  });

});
