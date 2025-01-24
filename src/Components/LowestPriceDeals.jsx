import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const LowestPriceDeals = ({ deals }) => (
  <div className="p-3">
    <h2 className="mb-4">Lowest Price Deals</h2>
    <Row>
      {deals.map((product) => (
        <Col md={4} key={product.id} className="mb-4">
          <Card className="shadow-sm h-100">
            {product.thumbnail && (
              <Card.Img variant="top" src={product.thumbnail} alt={product.title} className="card-img-custom" />
            )}
            <Card.Body>
              <Card.Title className="mb-3">{product.title}</Card.Title>
              <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
              <Card.Text><strong>Price:</strong> ₹{product.priceInRupees.toFixed(2)}</Card.Text>
              <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default LowestPriceDeals;
