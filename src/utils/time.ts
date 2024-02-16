export const getTime = () => {
  const hour = new Date().getHours()
  return hour <= 11
    ? '早上'
    : hour <= 13
      ? '中午'
      : hour <= 17
        ? '下午'
        : '晚上'
}
