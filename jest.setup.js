import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />; // Mock as a regular `img` element
  },
}));
