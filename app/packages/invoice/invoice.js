const SIZE = 30;
const LEFT = 20;
const RIGHT = SIZE - LEFT;
const dashLine = s.repeat('-', SIZE) + '\n';
const doubleDashLine = s.repeat('=', SIZE) + '\n';

const truncateSmart = (text) => text.length <= LEFT ? text : s.truncate(text, LEFT - 3);

const renderLine = (designation, value) => {
  return s.rpad(truncateSmart(designation), LEFT, ' ') +
    s.lpad(numeralAmountFormat(value), RIGHT, ' ') + '\n';
};

renderInvoice = (prices, discounts, total) => {
  let lines = '';
  prices.forEach((line) => lines += renderLine(line.designation, line.value));
  if (discounts.length !== 0) {
    lines += dashLine +
      s.rpad('Remises', SIZE, ' ') + '\n';
    discounts.forEach((line) => lines += renderLine(line.designation, line.value));
  }
  return (
    s.lrpad('FACTURE', SIZE, ' ') + '\n' +
    dashLine +
    lines +
    doubleDashLine +
    s.rpad('TOTAL', LEFT, ' ') + s.lpad(numeralAmountFormat(total), RIGHT, ' ')
  );
};
