const SIZE = 30;
const LEFT = 20;
const RIGHT = SIZE - LEFT;
const dashLine = s.repeat('-', SIZE);
const doubleDashLine = s.repeat('=', SIZE);

renderInvoice = (prices, discounts, total) => {
  let lines = '';
  prices.forEach((line, idx) => {
    lines += s.rpad(s.prune(line.designation, LEFT - 3), LEFT, ' ') +
      s.lpad(numeralAmountFormat(line.value), RIGHT, ' ');
    if (idx !== prices.length - 1) {
      lines += '\n';
    }
  });
  if (discounts.length !== 0) {
    lines += this.dashLine + '\n';
  }
  return (
    rpad('FACTURE', SIZE, ' ') + '\n' +
    dashLine + '\n' +
    lines +
    doubleDashLine +
    s.rpad('TOTAL', LEFT, ' ') + s.lpad(numeralAmountFormat(total), RIGHT, ' ')
  );
};
