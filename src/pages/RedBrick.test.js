import { render, screen } from "@testing-library/react";
import RedBrick from "./RedBrick";

test("RedBrick Render", () => {
  render(<RedBrick />);
  const testText = screen.getByLabelText("와이어바일리입니다");
});
