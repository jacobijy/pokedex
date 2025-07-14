// 格式化ID
export const padId = (id: number) => {
  return id.toString().padStart(3, '0');
};

// 根据能力值获取颜色
export const statColor = (value: number) => {
  if (value >= 150) return '#ff4d4d';
  if (value >= 100) return '#ff9e4d';
  if (value >= 80) return '#ffd24d';
  if (value >= 60) return '#b0d84d';
  if (value >= 40) return '#4db0d8';
  return '#4d7cd8';
};

// 属性类型颜色映射
export const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};