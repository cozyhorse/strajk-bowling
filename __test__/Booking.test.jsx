import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Booking from "../src/views/Booking";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Confirmation from "../src/views/Confirmation";

describe("App tests", () => {
  test("Test Filling all fields", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const submitBtn = screen.getByText("strIIIIIike!")
    const addShoeBtn = screen.getByText("+");
    
    fireEvent.change(screen.getByLabelText("Date"), {
        target: { value: "2024-12-09" },
    });
    fireEvent.change(screen.getByLabelText("Time"), {
        target: { value: "14:00" },
    });
    fireEvent.change(screen.getByLabelText("Number of awesome bowlers"), {
        target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Number of lanes"), {
        target: { value: "1" },
    });
    
    fireEvent.click(addShoeBtn);
    fireEvent.click(addShoeBtn);
    const removeShoeBtn = screen.getAllByText("-")
    fireEvent.click(removeShoeBtn[1])

    //Specify and change shoesize?
    fireEvent.change(screen.getByLabelText("Shoe size / person 1"), {
        target: { value: "34" },
      });
    fireEvent.change(screen.getByLabelText("Shoe size / person 1"), {
        target: { value: "29" },
      });
    expect(screen.getByLabelText("Date")).toHaveValue("2024-12-09");
    expect(screen.getByLabelText("Time")).toHaveValue("14:00");
    expect(screen.getByLabelText("Number of awesome bowlers")).toHaveValue(1);
    expect(screen.getByLabelText("Number of lanes")).toHaveValue(1);
    expect(screen.getByLabelText("Shoe size / person 1")).toHaveValue("29");

    waitFor(() => {
      fireEvent.click(submitBtn);
    })

      const sessionData = JSON.parse(sessionStorage.getItem("confirmation"));
      console.log("DATA", sessionData);

    //screen.debug();

  });
  test("Test error message when missing field", () => {
    render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
      const submitBtn = screen.getByText("strIIIIIike!")
      fireEvent.click(submitBtn);
      expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeDefined();

  })
  test("Test error message when Shoes does not match players", () => {
    render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
      const submitBtn = screen.getByText("strIIIIIike!")
      const addShoeBtn = screen.getByText("+");
      
      fireEvent.change(screen.getByLabelText("Date"), {
          target: { value: "2024-12-09" },
      });
      fireEvent.change(screen.getByLabelText("Time"), {
          target: { value: "14:00" },
      });
      fireEvent.change(screen.getByLabelText("Number of awesome bowlers"), {
          target: { value: "1" },
      });
      fireEvent.change(screen.getByLabelText("Number of lanes"), {
          target: { value: "1" },
      });
      
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
  
      fireEvent.change(screen.getByLabelText("Shoe size / person 1"), {
          target: { value: "34" },
        });
      expect(screen.getByLabelText("Date")).toHaveValue("2024-12-09");
  
      fireEvent.click(submitBtn);
      expect(screen.getByText("Antalet skor måste stämma överens med antal spelare"))
      //screen.debug();
        

  })
  test("Test error message when there is to many people on the lane", () => {
    render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
      const submitBtn = screen.getByText("strIIIIIike!")
      const addShoeBtn = screen.getByText("+");
      
      fireEvent.change(screen.getByLabelText("Date"), {
          target: { value: "2024-12-09" },
      });
      fireEvent.change(screen.getByLabelText("Time"), {
          target: { value: "14:00" },
      });
      fireEvent.change(screen.getByLabelText("Number of awesome bowlers"), {
          target: { value: "5" },
      });
      fireEvent.change(screen.getByLabelText("Number of lanes"), {
          target: { value: "1" },
      });
      
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
  
      fireEvent.change(screen.getByLabelText("Shoe size / person 1"), {
          target: { value: "34" },
        });
      fireEvent.change(screen.getByLabelText("Shoe size / person 2"), {
          target: { value: "34" },
        });
      fireEvent.change(screen.getByLabelText("Shoe size / person 3"), {
          target: { value: "34" },
        });
      fireEvent.change(screen.getByLabelText("Shoe size / person 4"), {
          target: { value: "34" },
        });
      fireEvent.change(screen.getByLabelText("Shoe size / person 5"), {
          target: { value: "34" },
        });

  
      fireEvent.click(submitBtn);
      expect(screen.getByText("Det får max vara 4 spelare per bana"))
      screen.debug();
        

  })
  test("Test error message when all shoes are not filled", () => {
    render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
      const submitBtn = screen.getByText("strIIIIIike!")
      const addShoeBtn = screen.getByText("+");
      
      fireEvent.change(screen.getByLabelText("Date"), {
          target: { value: "2024-12-09" },
      });
      fireEvent.change(screen.getByLabelText("Time"), {
          target: { value: "14:00" },
      });
      fireEvent.change(screen.getByLabelText("Number of awesome bowlers"), {
          target: { value: "2" },
      });
      fireEvent.change(screen.getByLabelText("Number of lanes"), {
          target: { value: "1" },
      });
      
      fireEvent.click(addShoeBtn);
      fireEvent.click(addShoeBtn);
  
      fireEvent.change(screen.getByLabelText("Shoe size / person 1"), {
          target: { value: "34" },
        });
  
      fireEvent.click(submitBtn);
      expect(screen.getByText("Alla skor måste vara ifyllda"))
      //screen.debug();
        

  })
  describe("Test add and remove shoe", () => {
      test("Test add shoe ", async () => {
        render(
          <MemoryRouter>
            <Booking />
          </MemoryRouter>
        );
        const addShoeBtn = screen.getByText("+");
        fireEvent.click(addShoeBtn);
        fireEvent.click(addShoeBtn);
        //screen.debug();
        const removeShoeBtn = screen.getAllByText("-")
        expect(removeShoeBtn).toHaveLength(2)
      });
      test("Test remove shoe ", async () => {
        render(
          <MemoryRouter>
            <Booking />
          </MemoryRouter>
        );
        const addShoeBtn = screen.getByText("+");
        fireEvent.click(addShoeBtn);
        fireEvent.click(addShoeBtn);
        const removeShoeBtn = screen.getAllByText("-")
        // expect(screen.getByText("Shoe size / person 1")).toBeDefined();
        // expect(screen.getByText("Shoe size / person 2")).toBeDefined();
        expect(removeShoeBtn).toHaveLength(2)
        // screen.debug();
        fireEvent.click(removeShoeBtn[1])
        const removeShoeBtnAfterClick = screen.getAllByText("-")
        console.log(removeShoeBtnAfterClick.length);
        expect(removeShoeBtnAfterClick).toHaveLength(1)
        expect(screen.queryByText("Shoe size / person 2")).toBeNull();
        //screen.debug();
      });


  })

});

