export const BASE_GLTF_URL = `${process.env.PUBLIC_URL}/gltf/`;

export const GLTF_URLS = ['zeng.glb', 'y.glb', 'city.glb', 'zengYCity.glb'].map(
  gltf => `${BASE_GLTF_URL}${gltf}`
);

export const BASE_POINTS_MAP = `${process.env.PUBLIC_URL}/gltf/png/`;

export const POINTS_MAPS = [
  'baby-blue.png',
  'blue.png',
  'blackish-green',
  'fluorescence-green',
  'green.png',
  'white.png',
  'yellow.png',
  'red.png',
].map(png => `${BASE_POINTS_MAP}${png}`);
