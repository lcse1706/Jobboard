// __tests__/Navigation.test.tsx
import * as deviceDetect from "react-device-detect";

import { render, screen } from "@testing-library/react";
// Importujemy useRouter do mockowania
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Importujemy useSession do mockowania
import { usePathname } from "next/navigation";

import { Navigation } from "../Navigation";

// Importujemy usePathname do mockowania

// Mockowanie isMobile z react-device-detect
jest.mock("react-device-detect", () => ({
  ...jest.requireActual("react-device-detect"),
  isMobile: false, // Domyślnie ustawiamy na false
}));

// Mockowanie next/router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mockowanie next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

const nav = [
  { label: "Home", link: "/" },
  { label: "Jobs", link: "/jobs" },
  { label: "About", link: "/about" },
];

describe("Navigation", () => {
  beforeEach(() => {
    // Mockujemy useRouter, useSession, i usePathname przed każdym testem
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
  });

  it("renders DesktopNavigation if isMobile is false", () => {
    render(<Navigation nav={nav} />);

    // Oczekujemy, że będą renderowane linki DesktopNavigation
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders MobileNavigation if isMobile is true", () => {
    // Nadpisujemy wartość isMobile na true dla tego testu
    jest.mocked(deviceDetect).isMobile = true;

    render(<Navigation nav={nav} />);

    // Oczekujemy, że MobileNavigation zostanie wyrenderowane
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
