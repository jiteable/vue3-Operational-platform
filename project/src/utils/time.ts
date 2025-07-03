export const getTime = (): string => {
  const hours = new Date().getHours()

  if (hours <= 9) return '早上'
  if (hours <= 12) return '上午'
  if (hours <= 18) return '下午'
  return '晚上'
}