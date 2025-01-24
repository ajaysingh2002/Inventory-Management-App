import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import InventoryList from './Components/InventoryList';
import ProductForm from './Components/ProductForm';
import FilterSort from './Components/FilterSort';
import LowestPriceDeals from './Components/LowestPriceDeals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByQuantity, setSortByQuantity] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [lowestPriceDeals, setLowestPriceDeals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const usdToInrRate = 80; // Example conversion rate, you might want to fetch the latest conversion rate.

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        const products = data.products.map(product => ({
          ...product,
          priceInRupees: product.price * usdToInrRate,
          stock: product.stock || product.quantity,
        }));
        setInventory(products);
        setCategories([...new Set(products.map(product => product.category))]);
        computeLowestPriceDeals(products);
      });
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      // Don't convert price again if it's already in Indian Rupees
      priceInRupees: product.price,
      stock: product.quantity,
    };
    const newInventory = [...inventory, newProduct];
    setInventory(newInventory);

    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }

    computeLowestPriceDeals(newInventory);
  };

  const editProduct = (id, updatedProduct) => {
    const newInventory = inventory.map(product => product.id === id ? { ...updatedProduct, id, priceInRupees: updatedProduct.price } : product);
    setInventory(newInventory);
    setProductToEdit(null);
    computeLowestPriceDeals(newInventory);
  };

  const deleteProduct = (id) => {
    const newInventory = inventory.filter(product => product.id !== id);
    setInventory(newInventory);
    computeLowestPriceDeals(newInventory);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const handleSort = () => {
    setSortByQuantity(prevSort => !prevSort);
  };

  const computeLowestPriceDeals = (products) => {
    const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
    setLowestPriceDeals(sortedByPrice.slice(0, 10));
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    document.getElementById(`product-${product.id}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const filteredInventory = inventory
    .filter(product => filterCategory === '' || product.category === filterCategory)
    .sort((a, b) => sortByQuantity ? a.stock - b.stock : 0);

  return (
    <div className="app-background">
      <Container className="text-center py-5" style={{ maxWidth: '1200px' }}>
        <h1 className="mb-4" style={{ color: '' }}>Inventory Management App</h1>
        <Row>
          <Col md={12}>
            <ProductForm addProduct={addProduct} editProduct={editProduct} productToEdit={productToEdit} categories={categories || []} />
          </Col>
          <Col md={12} className="my-3">
            <FilterSort handleFilter={handleFilter} handleSort={handleSort} categories={categories || []} />
          </Col>
          <Col md={12} className="my-3">
            <Button variant="info" onClick={() => setShowModal(true)}>Show Lowest Price Deals</Button>
          </Col>
          <Col md={12}>
            <InventoryList inventory={filteredInventory} deleteProduct={deleteProduct} setProductToEdit={handleEditClick} />
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-90w" aria-labelledby="lowest-price-deals-modal">
        <Modal.Header closeButton>
          <Modal.Title id="lowest-price-deals-modal">Lowest Price Deals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LowestPriceDeals deals={lowestPriceDeals} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
