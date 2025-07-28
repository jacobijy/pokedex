import { Types } from '@/model/TypesDefine';

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
export const typeColors: { [type: number]: string } = {
  [Types.Normal]: '#A8A878',
  [Types.Fire]: '#F08030',
  [Types.Water]: '#6890F0',
  [Types.Electric]: '#F8D030',
  [Types.Grass]: '#78C850',
  [Types.Ice]: '#98D8D8',
  [Types.Fighting]: '#C03028',
  [Types.Poison]: '#A040A0',
  [Types.Ground]: '#E0C068',
  [Types.Flying]: '#A890F0',
  [Types.Psychic]: '#F85888',
  [Types.Bug]: '#A8B820',
  [Types.Rock]: '#B8A038',
  [Types.Ghost]: '#705898',
  [Types.Dragon]: '#7038F8',
  [Types.Dark]: '#705848',
  [Types.Steel]: '#B8B8D0',
  [Types.Fairy]: '#EE99AC'
};
