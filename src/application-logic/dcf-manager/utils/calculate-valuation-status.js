export default function calculateValuationStatus(recentSharePrice, fairPrice) {
  if (fairPrice > recentSharePrice) {
    return (fairPrice - recentSharePrice) / fairPrice;
  }
  if (recentSharePrice > fairPrice) {
    return (fairPrice - recentSharePrice) / recentSharePrice;
  }
  return (fairPrice - recentSharePrice) / fairPrice; // Correctly valued
}
