import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { DesktopNavigation } from "../DesktopNavigation";

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

describe("DesktopNavigation", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
  });

  it("renders all navigation links", () => {
    render(<DesktopNavigation nav={nav} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders the login button if user is not authenticated", () => {
    render(<DesktopNavigation nav={nav} />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("renders 'My profile' button if user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { name: "Test User" } },
    });

    render(<DesktopNavigation nav={nav} />);

    const profileButton = screen.getByRole("button", { name: /my profile/i });
    expect(profileButton).toBeInTheDocument();
  });
});
