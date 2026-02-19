export function parseSalary(rawSalary) {
  if (!rawSalary) {
    return { raw: "Unspecified", min: 0, max: 0 };
  }

  const numbers = rawSalary.replace(/,/g, "").match(/\d+/g);

  if (!numbers) {
    return { raw: rawSalary, min: 0, max: 0 };
  }

  const min = parseInt(numbers[0]);
  const max = numbers[1] ? parseInt(numbers[1]) : min;

  return {
    raw: rawSalary,
    min,
    max
  };
}
