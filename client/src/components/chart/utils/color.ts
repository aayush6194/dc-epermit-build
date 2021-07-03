import { colors } from '../json/colors.json';

export const getColor = (index: number) => colors[index % colors.length];