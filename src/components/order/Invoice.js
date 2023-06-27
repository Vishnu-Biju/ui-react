import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title} fixed>
        {new Date().toLocaleString()}
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>EnigmaMart</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Text style={styles.text}>
        <Text>
          Date: {"               "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Order Id: {"         "}
          {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Order Status: {"  "}
          {order.orderStatus}
        </Text>
        {"\n"}
        <Text>
          Total Paid: {"       "}
          {order.paymentIntent.amount / 100}
        </Text>
      </Text>

      <Text style={styles.subtitle}>Order Details</Text>

      {showOrderInTable(order)}

      <Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
    </Page>
  </Document>
);

const showOrderInTable = (order) => {
  if (!order || !order.products) {
    return null; // Return null or handle the case when the order is not available
  }

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Order Items</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Title</Text>
          <Text style={styles.tableHeader}>Price</Text>
          <Text style={styles.tableHeader}>Brand</Text>
          <Text style={styles.tableHeader}>Color</Text>
          <Text style={styles.tableHeader}>Count</Text>
          <Text style={styles.tableHeader}>Shipping</Text>
        </View>
        {order.products.map((p, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{p.product.title}</Text>
            <Text style={styles.tableCell}>${p.product.price}</Text>
            <Text style={styles.tableCell}>{p.product.brand}</Text>
            <Text style={styles.tableCell}>{p.color}</Text>
            <Text style={styles.tableCell}>{p.count}</Text>
            <Text style={styles.tableCell}>
              {p.product.shipping === "Yes" ? (
                <Text style={styles.checkIcon}>✔</Text>
              ) : (
                <Text style={styles.crossIcon}>✖</Text>
              )}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "green",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#555555",
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "justify",
    color: "#666666",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  footer: {
    fontSize: 12,
    marginTop: 30,
    textAlign: "center",
    color: "gray",
  },
  tableContainer: {
    marginTop: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    height: 40,
    textAlign: "center",
  },
  tableTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
    width: "16.66%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
  },
  tableCell: {
    fontSize: 12,
    width: "16.66%",
    paddingVertical: 8,
  },
  checkIcon: {
    color: "green",
  },
  crossIcon: {
    color: "red",
  },
});

export default Invoice;
