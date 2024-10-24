import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL } from "../CommanConstants/CommanConstants";
import {
  faEarthAfrica,
  faLayerGroup,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../Loader/Loader";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [fullStars, setFullStars] = useState([]);
  const [hasHalfStar, sethasHalfStar] = useState();
  const [emptyStars, setemptyStars] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASEURL}/products/${id}`);
      if (response.data) {
        setLoading(false);
        setProduct(response.data);
        const fullStars = Math.floor(response.data.rating);
        setFullStars(fullStars);
        const hasHalfStar = response.data.rating - fullStars >= 0.5;
        sethasHalfStar(hasHalfStar);
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        setemptyStars(emptyStars);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="container my-4 product-container">
        <h2 className="text-center text-bold mb-5">Product Details</h2>
        <div className="row g-0 border rounded overflow-hidden shadow-lg h-md-250 position-relative">
          {/* Product Image */}
          <div className="col-md-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid"
            />
          </div>

          {/* Product Details */}
          <div className="col-md-8 p-4 d-flex flex-column position-static">
            <h3 className="mb-2 text-bold">{product.title}</h3>
            <p className="card-text">{product.description}</p>
            <p>
              <FontAwesomeIcon icon={faLayerGroup} /> &nbsp;&nbsp;{" "}
              {product.brand}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faEarthAfrica} /> &nbsp;&nbsp;
              {product.category}
            </p>

            <div className="d-flex align-items-center mb-3">
              {product.availabilityStatus === "In Stock" ? (
                <span className="badge bg-success">In Stock</span>
              ) : (
                <span className="badge bg-danger">Out Of Stock</span>
              )}
              &nbsp;&nbsp;&nbsp;
              {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-warning"
                />
              ))}
              {hasHalfStar && (
                <FontAwesomeIcon
                  icon={faStarHalfAlt}
                  className="text-warning"
                />
              )}
              {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-muted"
                />
              ))}{" "}
              &nbsp;&nbsp;
              <strong> {product.rating} Rating</strong>
            </div>

            <div className="mb-2 text-muted d-flex">
              <span className="badge bg-light text-dark me-2">
                {product.pieces}
              </span>
              <span className="badge bg-light text-dark">{product.serves}</span>
            </div>

            {/* Price Section */}
            <div className="d-flex align-items-center mb-2">
              <h4 className="me-3 mb-0 text-success">₹{product.price}</h4>
              {product.discountPercentage && (
                <h6 className="text-muted text-decoration-line-through">
                  ₹
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </h6>
              )}
            </div>
            <div className="tags-container my-3">
              {product?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
