import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "../CommanConstants/CommanConstants";
import "./Products.css";
import { Button, Card, Col, Container, Row, Pagination } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * limit;
      const response = await axios.get(
        `${BASEURL}/products?limit=${limit}&skip=${skip}`
      );
      if (response.data) {
        setLoading(false);
        setAllProducts(response.data.products);
        setTotalProducts(response.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    getAllProducts();
  }, [currentPage]);
  return (
    <>
      {loading ? <Loader /> : ""}
      <Container className="py-5 product-container">
        <h2 className="text-center mb-5"> All Products</h2>
        <Row>
          {allProducts &&
            allProducts.map((row) => (
              <Col md={3} className="mb-5">
                <Card style={{ width: "18rem", borderRadius: "20px" }}>
                  <Card.Img variant="top" src={row.thumbnail} alt={row.title} />
                  <Card.Body>
                    <Card.Title>{row.title}</Card.Title>
                    <Card.Text> ₹{row.price}</Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => navigateToDetailPage(row.id)}
                    >
                      View More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          <div className="d-flex justify-content-center">
            {/* Pagination */}
            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {/* Render page numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Products;
