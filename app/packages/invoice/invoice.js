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

SD.Utils.renderInvoice = (prices, discounts, totalHT, totalTTC) => {
  let lines = '';
  prices.forEach((line) => lines += renderLine(line.designation, line.value));
  if (discounts.length !== 0) {
    lines += dashLine +
      s.lrpad('Remises', SIZE, ' ') + '\n';
    discounts.forEach((line) => lines += renderLine(line.designation, -line.value));
  }
  return (
    s.lrpad('FACTURE', SIZE, ' ') + '\n' +
    dashLine +
    lines +
    dashLine +
    s.rpad('TOTAL (HT)', LEFT, ' ') + s.lpad(numeralAmountFormat(totalHT), RIGHT, ' ') + '\n' +
    doubleDashLine +
    s.rpad('TOTAL (TTC)', LEFT, ' ') + s.lpad(numeralAmountFormat(totalTTC), RIGHT, ' ')
  );
};

// Schema of expected invoice information
SD.Structure.InvoiceSchema = new SimpleSchema({
  prices: {type: Array, label: 'Prix facturés', min: 1, max: 256},
  'prices.$': {type: Object, label: 'Prix facturé', min: 1, max: 256},
  'prices.$.designation': {type: String, label: 'Désignation'},
  'prices.$.value': {type: Number, label: 'Valeur en € HT', min: 0, max: 1000},
  discounts: {type: Array, label: 'Remises appliquées', min: 0, max: 256},
  'discounts.$': {type: Object, label: 'Prix facturé'},
  'discounts.$.designation': {type: String, label: 'Remise appliquée'},
  'discounts.$.value': {type: Number, label: 'Valeur en € HT', min: 0, max: 1000},
  totalHT: {type: Number, label: 'Montant total en € HT', min: 0, max: 10000},
  totalTTC: {type: Number, label: 'Montant total en € TTC', min: 0, max: 10000}
});
