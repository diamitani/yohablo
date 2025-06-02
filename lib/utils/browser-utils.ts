/**
 * Safely checks if a browser extension is available
 * @param checkFn Function that checks for the extension
 * @returns Boolean indicating if extension is available
 */
export function safelyCheckExtension(checkFn: () => boolean): boolean {
  try {
    // Only run in browser environment
    if (typeof window === "undefined") return false

    return checkFn()
  } catch (error) {
    console.log("Extension check error:", error)
    return false
  }
}

/**
 * Safely checks if MetaMask is installed
 * @returns Boolean indicating if MetaMask is available
 */
export function isMetaMaskInstalled(): boolean {
  return safelyCheckExtension(() => {
    return (
      typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask === true
    )
  })
}
