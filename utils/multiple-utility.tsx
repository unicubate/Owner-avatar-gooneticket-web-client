/*
 * others
 */

export const formatePrice = (options: {
  value: number;
  isDivide: boolean;
}) => {
  const { value, isDivide } = options;
  const numberCal = isDivide ? value / 100 : value;
  return (
    <>
      {!isNaN(numberCal) && String(numberCal).includes(".")
        ? numberCal.toLocaleString()
        : `${numberCal.toLocaleString()},00`}{" "}
    </>
  );
};
