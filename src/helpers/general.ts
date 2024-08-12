export const openUrlInNewTab = (url?: string) => {
  if (!url) return

  window.open(url, '_blank')
}
