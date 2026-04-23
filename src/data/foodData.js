import biryaniImg from '../assets/food/biryani.png';
import vadaPavImg from '../assets/food/vada_pav.png';
import chaatImg from '../assets/food/chaat.png';
import samosaImg from '../assets/food/samosa.png';
import pavBhajiImg from '../assets/food/pav_bhaji.png';
import momosImg from '../assets/food/momos.png';
import paniPuriImg from '../assets/food/pani_puri.png';
import idlyImg from '../assets/food/idly.png';
import dosaImg from '../assets/food/dosa.png';
import paneerTikkaImg from '../assets/food/paneer_tikka.png';
import rajmaChawalImg from '../assets/food/rajma_chawal.png';
import gulabJamunImg from '../assets/food/gulab_jamun.png';

// International Imports
import congeeImg from '../assets/food/congee.png';
import pozoleImg from '../assets/food/pozole.png';
import paellaImg from '../assets/food/paella.png';
import sourdoughImg from '../assets/food/sourdough.png';
import buchimgaeImg from '../assets/food/buchimgae.png';
import eloteImg from '../assets/food/elote.png';
import cevicheImg from '../assets/food/ceviche.png';
import shishTaoukImg from '../assets/food/shish_taouk.png';
import poutineImg from '../assets/food/poutine.png';
import feijoadaImg from '../assets/food/feijoada.png';
import empanadasImg from '../assets/food/empanadas.png';
import baoBunsImg from '../assets/food/bao_buns.png';
import xiaolongbaoImg from '../assets/food/xiaolongbao.png';
import loukoumadesImg from '../assets/food/loukoumades.png';

export const INDIAN_DISHES = [
  { 
    id: 'idly', 
    name: 'Idly', 
    image: idlyImg, 
    traits: ['Fermented & airy', 'Soft & comforting'],
    description: 'The soul of South India, fluffy and weightless.'
  },
  { 
    id: 'dosa', 
    name: 'Dosa', 
    image: dosaImg, 
    traits: ['Crispy & playful', 'Savory & thin'],
    description: 'A golden, paper-thin crunch with a savory heart.'
  },
  { 
    id: 'biryani', 
    name: 'Biryani', 
    image: biryaniImg, 
    traits: ['Bold & spicy', 'Rich & layered'],
    description: 'The king of aromatics, where every grain tells a story.'
  },
  { 
    id: 'chaat', 
    name: 'Chaat', 
    image: chaatImg, 
    traits: ['Street-food chaos', 'Tangy & adventurous'],
    description: 'An explosion of sweet, sour, and spicy in one bite.'
  },
  { 
    id: 'paneer-tikka', 
    name: 'Paneer Tikka', 
    image: paneerTikkaImg, 
    traits: ['Smoky & grilled', 'Soft & succulent'],
    description: 'Charred perfection with a melt-in-mouth texture.'
  },
  { 
    id: 'pav-bhaji', 
    name: 'Pav Bhaji', 
    image: pavBhajiImg, 
    traits: ['Buttery & mashed', 'Spicy & dippable'],
    description: 'A buttery street classic that warms the soul.'
  },
  { 
    id: 'rajma-chawal', 
    name: 'Rajma Chawal', 
    image: rajmaChawalImg, 
    traits: ['Mild & wholesome', 'Earthy & comforting'],
    description: 'Homemade comfort that feels like a warm hug.'
  },
  { 
    id: 'samosa', 
    name: 'Samosa', 
    image: samosaImg, 
    traits: ['Crunchy & fried', 'Spiced pockets'],
    description: 'The ultimate golden pyramid of flavor.'
  },
  { 
    id: 'vada-pav', 
    name: 'Vada Pav', 
    image: vadaPavImg, 
    traits: ['Soft & pillowy', 'Crispy & bold'],
    description: 'The Mumbai legend—humble, spicy, and satisfying.'
  },
  { 
    id: 'momos', 
    name: 'Momos', 
    image: momosImg, 
    traits: ['Steamed & delicate', 'Juicy & soft'],
    description: 'Translucent parcels of Himalayan joy.'
  },
  { 
    id: 'gulab-jamun', 
    name: 'Gulab Jamun', 
    image: gulabJamunImg, 
    traits: ['Sweet & syrup-soaked', 'Indulgent & soft'],
    description: 'Saffron-scented orbs of pure decadence.'
  },
  { 
    id: 'pani-puri', 
    name: 'Pani Puri', 
    image: paniPuriImg, 
    traits: ['Exploding flavors', 'Tangy & adventurous'],
    description: 'The ultimate culinary firework.'
  },
];

export const MAPPING = {
  'Soft & comforting': {
    name: 'Congee',
    country: 'China',
    description: 'A warm hug in a bowl, similar to the comforting embrace of Rajma Chawal.',
    image: congeeImg
  },
  'Fermented & airy': {
    name: 'Sourdough Pancakes',
    country: 'USA/Europe',
    description: 'The bubbly, airy texture reminds you of the perfect fermented batter of an Idly.',
    image: sourdoughImg
  },
  'Crispy & playful': {
    name: 'Korean Buchimgae',
    country: 'Korea',
    description: 'A savory, crispy pancake that shares the DNA of your favorite Dosa.',
    image: buchimgaeImg
  },
  'Bold & spicy': {
    name: 'Mexican Pozole',
    country: 'Mexico',
    description: 'Rich, spicy, and deeply layered, just like a royal Biryani.',
    image: pozoleImg
  },
  'Rich & layered': {
    name: 'Paella',
    country: 'Spain',
    description: 'A symphony of rice and spices that echoes the complexity of Biryani.',
    image: paellaImg
  },
  'Street-food chaos': {
    name: 'Elote',
    country: 'Mexico',
    description: 'Messy, tangy, and absolutely addictive street food, just like Chaat.',
    image: eloteImg
  },
  'Tangy & adventurous': {
    name: 'Ceviche',
    country: 'Peru',
    description: 'Fresh, zesty, and bold. It\'s the adventurous spirit of Pani Puri in a bowl.',
    image: cevicheImg
  },
  'Smoky & grilled': {
    name: 'Shish Taouk',
    country: 'Middle East',
    description: 'Expertly charred and tenderized, echoing the smokiness of Paneer Tikka.',
    image: shishTaoukImg
  },
  'Buttery & mashed': {
    name: 'Poutine',
    country: 'Canada',
    description: 'Rich, savory, and gloriously indulgent, much like the buttery goodness of Pav Bhaji.',
    image: poutineImg
  },
  'Mild & wholesome': {
    name: 'Feijoada',
    country: 'Brazil',
    description: 'A hearty bean stew that warms the soul just like your favorite Rajma.',
    image: feijoadaImg
  },
  'Crunchy & fried': {
    name: 'Empanadas',
    country: 'Latin America',
    description: 'The golden, crispy pocket of joy that every Samosa lover will adore.',
    image: empanadasImg
  },
  'Soft & pillowy': {
    name: 'Bao Buns',
    country: 'Taiwan',
    description: 'Cloud-like buns that cradle flavorful hearts, just like a Vada Pav.',
    image: baoBunsImg
  },
  'Steamed & delicate': {
    name: 'Xiaolongbao',
    country: 'China',
    description: 'Delicate dough holding a world of flavor, just like your beloved Momos.',
    image: xiaolongbaoImg
  },
  'Sweet & syrup-soaked': {
    name: 'Loukoumades',
    country: 'Greece',
    description: 'Honey-drenched dough balls that satisfy the same soul as Gulab Jamun.',
    image: loukoumadesImg
  }
};
