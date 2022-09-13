export function getPercentage(rating: number): number {
  return Math.round((5 - rating) * 19);
}
