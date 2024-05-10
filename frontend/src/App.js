import data from './data.js';

function App() {
  return (
    <div>
      <header>
        <a href="/">TechStore</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        {data.products.map((product) => (
          <div key={product.productid}>
            <img src="./images/mouse.png" alt={product.name} />
            <img src={product.img} alt={product.name} />
          </div>
        ))}
      </main>
    </div>
  );
}
export default App;