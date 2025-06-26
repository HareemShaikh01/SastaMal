"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
// import AdminNavbar from "@/components/admin/AdminNavbar";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Navbar from "@/components/admin/navbar/navbar";
import Sidebar from "@/components/admin/sidebar/sidebar";
import Wrapper from "@/layout/wrapper";
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Bootstrap JS import
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/all`);
        const data = await res.json();
        if (data.data) {
          setProducts(data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch productsss.");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/all`);
        const data = await res.json();
        if (data.result) {
          setCategories(data.result); // Adjust according to your actual API structure
        }
      } catch (error) {
        console.error("Error fetching categories:::::::::::::::::", error);
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/get-orders`);
        const data = await res.json();
        if (data.success && data.data) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        // setLoading(false);
      }
    };




    fetchOrders();
    fetchProducts();
    fetchCategories();
  }, []);


  return (
    <>
      <AdminProtectedRoute>
        <Wrapper>
          <Sidebar />
          <main className="main-content py-0">
            <Navbar />
            <div className="main-content-div">
              <h3>Dashboard Page</h3>
              <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                  <div className="header-body">
                    {/* Card stats */}
                    <Row>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Products
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">{products.length}</span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fa-solid fa-user p-2"></i>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-success mr-2">
                                <i className="fa fa-arrow-up" /> 3.48%
                              </span>{" "}
                              <span className="text-nowrap">Since last month</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Categories
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">{categories.length}</span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                  <i className="fa-solid fa-chart-pie p-2"></i>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-danger mr-2">
                                <i className="fas fa-arrow-down" /> 3.48%
                              </span>{" "}
                              <span className="text-nowrap">Since last week</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Sales
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">{orders.length}</span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-yellow text-black rounded-circle shadow">
                                  <i className="fa-regular fa-user p-2"></i>
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-warning mr-2">
                                <i className="fas fa-arrow-down" /> 1.10%
                              </span>{" "}
                              <span className="text-nowrap">Since yesterday</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Subscription List
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">25</span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                  <i className="fas fa-percent" />
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-success mr-2">
                                <i className="fas fa-arrow-up" /> 12%
                              </span>{" "}
                              <span className="text-nowrap">Since last month</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
            </div>
          </main>
        </Wrapper>
      </AdminProtectedRoute>

    </>
  );
};

export default AdminDashboard;
