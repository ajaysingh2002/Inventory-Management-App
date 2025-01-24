import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ProductForm = ({ addProduct, editProduct, productToEdit, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setCategory(productToEdit.category);
      setQuantity(productToEdit.stock);
      setPrice(productToEdit.price);
      setDiscount(productToEdit.discountPercentage || '');
      setDescription(productToEdit.description || '');
      setImage(productToEdit.image || null);
    }
  }, [productToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { title, category, quantity, price, discountPercentage: discount, description, image };
    if (productToEdit) {
      editProduct(productToEdit.id, newProduct);
    } else {
      addProduct(newProduct);
    }
    setTitle('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setDiscount('');
    setDescription('');
    setImage(null);
    document.getElementById('formImage').value = '';
  };

  return (
    <Container className="p-3">
      <Form onSubmit={handleSubmit} className="bg-light p-3 rounded shadow-sm">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formProductTitle">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price < 0 ? 0 : price} onChange={(e) => setPrice(Math.max(0, e.target.value))} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="formImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button variant="primary" type="submit" className="mt-3">{productToEdit ? 'Update Product' : 'Add Product'}</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProductForm;
