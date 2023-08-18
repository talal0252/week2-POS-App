import React from "react";
import Home from "./containers/Home";
import { ProductProvider } from "./contexts/ProductContext";

const App = () => (
    <ProductProvider>
        <Home />
    </ProductProvider>
);

export default App;
