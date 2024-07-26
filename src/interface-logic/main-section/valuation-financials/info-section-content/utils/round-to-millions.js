export default function roundToMillions(amount) {
  const rounded = Math.round(amount / 1000000);

  if (rounded >= 1000) {
    const billions = Math.floor(rounded / 1000);
    const millions = rounded % 1000;
    return `${billions},${millions.toString().padStart(3, '0')}`;
  } else {
    return rounded.toString();
  }
}
