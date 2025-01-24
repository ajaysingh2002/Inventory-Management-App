import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FilterSort = ({ handleFilter, handleSort, categories = [] }) => {
  return (
    <div className="p-3 bg-light rounded shadow-sm">
      <Row>
        <Col md={8}>
          <Form.Group controlId="formFilterCategory">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control as="select" onChange={(e) => handleFilter(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleSort} className="mt-4">Sort by Quantity</Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterSort;
