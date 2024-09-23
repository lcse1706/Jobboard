import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { MobileNavigation } from "../MobileNavigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

const nav = [
  { label: "Home", link: "/" },
  { label: "Jobs", link: "/jobs" },
  { label: "About", link: "/about" },
];

describe("MobileNavigation", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
  });

  it("renders all navigation links when menu is open", () => {
    render(
      <MobileNavigation nav={nav} isOpen={true} handleHamburger={jest.fn()} />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("does not render links when menu is closed", () => {
    render(
      <MobileNavigation nav={nav} isOpen={false} handleHamburger={jest.fn()} />
    );

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Jobs")).not.toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });

  it("triggers handleHamburger when menu is clicked", () => {
    const handleHamburger = jest.fn();
    render(
      <MobileNavigation
        nav={nav}
        isOpen={true}
        handleHamburger={handleHamburger}
      />
    );

    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);

    expect(handleHamburger).toHaveBeenCalledTimes(1);
  });
});
