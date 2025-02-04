import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Home from "../pages/index";
import axios from "axios";

jest.mock("axios");

describe("Home Component", () => {
    const mockPokemons = {
        data: {
            results: [
                { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
                { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
                { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
            ],
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {}));

        render(<Home />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test("renders error message when API request fails", async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

        await act(async () => {
            render(<Home />);
        });

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
        });
    });

    test("renders Pokemon list after fetching data", async () => {
        (axios.get as jest.Mock).mockResolvedValue(mockPokemons);

        await act(async () => {
            render(<Home />);
        });

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
            expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
            expect(screen.getByText(/charmander/i)).toBeInTheDocument();
        });
    });

    test("filters Pokemon by search input", async () => {
        (axios.get as jest.Mock).mockResolvedValue(mockPokemons);

        await act(async () => {
            render(<Home />);
        });

        await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "ivy" } });

        await waitFor(() => {
            expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
            expect(screen.queryByText(/bulbasaur/i)).toBeNull();
            expect(screen.queryByText(/charmander/i)).toBeNull();
        });
    });

    test("navigates pages using pagination", async () => {
        (axios.get as jest.Mock).mockResolvedValue(mockPokemons);

        await act(async () => {
            render(<Home />);
        });

        await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());

        const paginationButtons = screen.getAllByRole("button");
        fireEvent.click(paginationButtons[2]); // Mengklik halaman kedua

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("offset=20")
        );
    });
});
