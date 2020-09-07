// We are rendering `<Application />` down below, so we need React.createElement
import React from "react";

//  We import our helper functions from the react-testing-library.
//  The render function allows us to render Components
import { render, cleanup } from "@testing-library/react";

// We import the component that we are testing
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  
  // A test that renders a React Component
  it("renders without crashing", () => {
    render(<Appointment />);
  });


  it("checks the working of a mock function", () => {
    const fn = jest.fn((a, b) => a + b);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(3);
   });
   
  
});
