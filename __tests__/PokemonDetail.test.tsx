import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import axios from "axios";
import PokemonDetail from "../pages/pokemon/[id]";

jest.mock("axios");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("PokemonDetail Component", () => {
    const mockPokemon = {
        name: "pikachu",
        sprites: { front_default: "https://pokeapi.co/media/sprites/pikachu.png" },
        abilities: [{ ability: { name: "static" } }],
        height: 4,
        weight: 60,
        types: [{ type: { name: "electric" } }],
        stats: [{ base_stat: 35, stat: { name: "speed" } }],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", () => {
        (useRouter as jest.Mock).mockReturnValue({ query: { id: "25" } });
        (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
        
        render(<PokemonDetail />);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    test("renders error message when API request fails", async () => {
        (useRouter as jest.Mock).mockReturnValue({ query: { id: "25" } });
        (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

        render(<PokemonDetail />);
        
        await waitFor(() => {
            expect(screen.getByText(/failed to fetch pokémon details/i)).toBeInTheDocument();
        });
    });

    test("renders Pokemon details after fetching data", async () => {
        (useRouter as jest.Mock).mockReturnValue({ query: { id: "25" } });
        (axios.get as jest.Mock).mockResolvedValue({ data: mockPokemon });

        render(<PokemonDetail />);
        
        await waitFor(() => {
            expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
            expect(screen.getByText(/static/i)).toBeInTheDocument();
            expect(screen.getByText(/electric/i)).toBeInTheDocument();
            expect(screen.getByText(/0.4 m/i)).toBeInTheDocument();
            expect(screen.getByText(/6 kg/i)).toBeInTheDocument();
            expect(screen.getByText(/speed/i)).toBeInTheDocument();
            expect(screen.getByText(/35/i)).toBeInTheDocument();
        });
    });
});
