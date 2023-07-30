import { useEffect, useState } from "react";
import snacks from "./db/snacks";
import "./styles.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [snacksData, setSnacksData] = useState(snacks);

  const [toggleState, setToggleState] = useState({
    id: false,
    product_name: false,
    product_weight: false,
    price: false,
    calories: false,
    ingredients: false
  });

  const newData = snacksData.filter(
    (snack) =>
      snack.product_name?.toLowerCase().includes(searchText) ||
      snack.ingredients?.join(" ").toLowerCase().includes(searchText)
  );

  const searchedSnacksData = searchText.length !== 0 ? newData : snacksData;

  const handleToggle = (type) => {
    switch (type) {
      case "id":
        if (toggleState.id) {
          const sortById = [...snacksData];
          sortById.sort((a, b) => a.id - b.id);
          setSnacksData(() => sortById);
          setToggleState(() => ({ ...toggleState, id: false }));
        } else {
          const sortById = [...snacksData];
          sortById.sort((a, b) => b.id - a.id);
          setSnacksData(() => sortById);
          setToggleState(() => ({ ...toggleState, id: true }));
        }
        break;

      case "product_name":
        if (toggleState.product_name) {
          const sortByName = [...snacksData];
          sortByName.sort((a, b) =>
            b.product_name.localeCompare(a.product_name)
          );
          setSnacksData(() => sortByName);
          setToggleState(() => ({ ...toggleState, product_name: false }));
        } else {
          const sortByName = [...snacksData];
          sortByName.sort((a, b) =>
            a.product_name.localeCompare(b.product_name)
          );
          setSnacksData(() => sortByName);
          setToggleState(() => ({ ...toggleState, product_name: true }));
        }
        break;

      case "product_weight":
        if (toggleState.product_weight) {
          const sortByWeight = [...snacksData];
          sortByWeight.sort(
            (a, b) =>
              Number(a.product_weight.slice(0, -1)) -
              Number(b.product_weight.slice(0, -1))
          );
          setSnacksData(() => sortByWeight);
          setToggleState(() => ({ ...toggleState, product_weight: false }));
        } else {
          const sortByWeight = [...snacksData];
          sortByWeight.sort(
            (a, b) =>
              Number(b.product_weight.slice(0, -1)) -
              Number(a.product_weight.slice(0, -1))
          );
          setSnacksData(() => sortByWeight);
          setToggleState(() => ({ ...toggleState, product_weight: true }));
        }
        break;

      case "price":
        if (toggleState.price) {
          const sortByPrice = [...snacksData];
          sortByPrice.sort((a, b) => a.price - b.price);
          setSnacksData(() => sortByPrice);
          setToggleState(() => ({ ...toggleState, price: false }));
        } else {
          const sortByPrice = [...snacksData];
          sortByPrice.sort((a, b) => b.price - a.price);
          setSnacksData(() => sortByPrice);
          setToggleState(() => ({ ...toggleState, price: true }));
        }
        break;

      case "calories":
        if (toggleState.calories) {
          const sortByCalories = [...snacksData];
          sortByCalories.sort((a, b) => a.price - b.price);
          setSnacksData(() => sortByCalories);
          setToggleState(() => ({ ...toggleState, calories: false }));
        } else {
          const sortByCalories = [...snacksData];
          sortByCalories.sort((a, b) => b.price - a.price);
          setSnacksData(() => sortByCalories);
          setToggleState(() => ({ ...toggleState, calories: true }));
        }
        break;

      case "ingredients":
        if (toggleState.ingredients) {
          const sortByIngredients = [...snacksData];
          sortByIngredients.sort((a, b) =>
            b.ingredients[0].localeCompare(a.ingredients[0])
          );
          setSnacksData(() => sortByIngredients);
          setToggleState(() => ({ ...toggleState, ingredients: false }));
        } else {
          const sortByIngredients = [...snacksData];
          sortByIngredients.sort((a, b) =>
            a.ingredients[0].localeCompare(b.ingredients[0])
          );
          setSnacksData(() => sortByIngredients);
          setToggleState(() => ({ ...toggleState, ingredients: true }));
        }
        break;

      default:
        return searchedSnacksData;
    }
  };

  return (
    <div className="App">
      <h1>Snack Table</h1>
      <input
        type="text"
        placeholder="Search with Products or Ingredients..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleToggle("id")}>ID</th>
            <th onClick={() => handleToggle("product_name")}>Product Name</th>
            <th onClick={() => handleToggle("product_weight")}>
              Product Weight
            </th>
            <th onClick={() => handleToggle("price")}>Price (INR)</th>
            <th onClick={() => handleToggle("calories")}>Calories</th>
            <th onClick={() => handleToggle("ingredients")}>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {searchedSnacksData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.product_name}</td>
              <td>{product.product_weight}</td>
              <td>{product.price}</td>
              <td>{product.calories}</td>
              <td>
                {product.ingredients.map((ingredient) => (
                  <span key={ingredient}>{ingredient + ", "}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
