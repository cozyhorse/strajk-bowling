import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Navigation from "../src/components/Navigation/Navigation";
import Booking from "../src/views/Booking";
import Confirmation from "../src/views/Confirmation";
import App from "../src/App";


describe("Navigation Tests", () => {
    test("Navigate to Confirmation", () => {
        render(<App />)
       
       const menuBtn = screen.getAllByRole("img");
       
       fireEvent.click(menuBtn[0]);
       const confirmation = screen.getAllByText("Confirmation");
       
       fireEvent.click(confirmation[0]);
       expect(screen.queryByText("Inga bokning gjord")).toBeDefined();
    })
    test("Navigate to Booking", () => {
        render(<App />)
       
       const menuBtn = screen.getAllByRole("img");
       
       fireEvent.click(menuBtn[0]);
       //screen.debug();
       const booking = screen.getByText("Booking");
       //console.log(confirmation[0]);
       
       fireEvent.click(booking);
       expect(screen.queryByText("When, WHAT & Who")).toBeDefined();
       expect(screen.queryByText("Date")).toBeDefined();
    })
})