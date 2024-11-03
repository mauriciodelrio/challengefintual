class Portfolio {
  constructor() {
    this.stocks = [];
  }

  addStock(price, date) {
    this.stocks.push(new Stocks(price, date));
  }

  profit(startDate, endDate) { // las fechas deben ser en formato timestamp
    //
    let returnedStocks = this.stocks.filter(stock => stock.date >= startDate && stock.date <= endDate); // filtro las acciones por fecha
    returnedStocks = returnedStocks.map(stock => stock.price(stock.date)); // mapeo las acciones filtradas y obtengo el valor de cada una
    return returnedStocks.reduce((a, b) => a + b, 0); // sumo todos los precios de las acciones en el filtro de fecha

  }

  annualized(startDate, endDate) { // acá tuve que averiguar como se calcula la ganacia anualizada vi varias fórmulas pero supongo que es esta: (valor final/valor inicial)^365/dias  + 1
    const profit = this.profit(startDate, endDate);
    const days = (endDate - startDate) / (60 * 60 * 24); // asumo que el primero ingresado es el más antiguo 
    console.log(profit, days);
    return Math.pow(profit, 365 / days) + 1; // puede que la formula no sea la correcta, pero la idea es tomar el profit del periodo. Elevarlo a un año en días dividido la cantidad de días, para abordar menos o más de un año. La explicación financiera no la puedo dar, no es mi campo.

  }

}

class Stocks {
  constructor(price, date) {
    this[date] = price;
    this.date = date; // guardo la fecha igualmente en un campo aparte ya que la ocupo en profit y se me hizo fácil hacerlo así.
  }

  price(date) {
    return this[date]; // con esto retorno el precio solamente sabiendo la fecha, fue lo que se me ocurrió para obtener el precio sabiendo la fecha
  }
}

let port = new Portfolio()

port.addStock(100, 1730545985)

port.addStock(3000, 1730632385)

port.addStock(3000, 1730718785)

console.log(port.profit(1730545985, 1730718785))

console.log(port.annualized(1730545985, 1730718785))


// acá unas pruebas, mientras más dias se evaluen más preciso se vuelve, habría que probar colocando varias fechas y precios.
