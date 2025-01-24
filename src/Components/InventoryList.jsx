import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const InventoryList = ({ inventory, deleteProduct, setProductToEdit }) => (
  <div className="p-3">
    <h2 className="mb-4">Inventory List</h2>
    <Row>
      {inventory.map((product) => (
        <Col md={4} key={product.id} className="mb-4">
          <Card id={`product-${product.id}`} className={`shadow-sm h-100 ${product.stock < 10 ? 'border-danger' : ''}`}>
            {product.image && (
              <Card.Img variant="top" src={product.image} alt={product.title} className="card-img-custom" />
            )}
            <Card.Body>
              <Card.Title className="mb-3">{product.title}</Card.Title>
              <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
              <Card.Text><strong>Quantity:</strong> {product.stock}</Card.Text>
              <Card.Text><strong>Price:</strong> ₹{product.priceInRupees.toFixed(2)}</Card.Text>
              <Card.Text><strong>Discount:</strong> {product.discountPercentage}%</Card.Text>
              {product.description && <Card.Text><strong>Description:</strong> {product.description}</Card.Text>}
              <Button variant="warning" className="me-2" onClick={() => setProductToEdit(product)}>Edit</Button>
              <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default InventoryList;
