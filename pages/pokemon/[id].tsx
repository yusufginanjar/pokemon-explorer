import axios from 'axios';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonDetailProps {
  pokemon: PokemonDetail;
}

const PokemonDetail: NextPage<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemons = res.data.results;

  const paths = pokemons.map((pokemon: any, index: number) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
  const pokemon = res.data;

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonDetail;