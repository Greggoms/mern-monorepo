import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PurchaseDetails } from "../../interfaces/PurchaseDetails";
import { Product } from "../../interfaces/db/Product";

// Create styles
const styles = StyleSheet.create({
  page: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10px",
    borderBottom: "1px solid #333",
  },
  h1: {
    fontSize: "26pt",
    fontWeight: 700,
  },
  purchaseDate: {},
  purchaseNumber: {
    color: "#777",
    fontSize: "12pt",
  },
  tableContainer: {
    paddingVertical: "30px",
  },
  tableHeaderContainer: {
    flexDirection: "row",
    borderBottom: "2px solid #000",
  },
  tableHeaderIndex: {
    padding: "3px",
    width: "10%",
  },
  tableHeaderName: {
    padding: "3px",
    flexGrow: 1,
  },
  tableHeaderPrice: {
    padding: "3px",
    width: "15%",
  },
  tableHeaderQty: {
    padding: "3px",
    width: "15%",
  },
  tableRowContainer: {
    flexDirection: "row",
    borderBottom: "2px solid #777",
    fontSize: "16pt",
  },
  tableRowIndex: {
    padding: "3px",
    width: "10%",
  },
  tableRowName: {
    padding: "3px",
    flexGrow: 1,
  },
  tableRowPrice: {
    padding: "3px",
    width: "15%",
  },
  tableRowQty: {
    padding: "3px",
    width: "15%",
  },
  tableFooterContainer: {
    paddingVertical: "10px",
  },
  total: {
    fontSize: "24pt",
    fontWeight: 700,
  },
  promo: {
    fontWeight: 700,
  },
  noPromo: {
    color: "#777",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#777",
  },
});

/** React on the server */
export default function generatePurchaseInvoice(
  purchaseDetails: PurchaseDetails
) {
  const { id, products } = purchaseDetails;

  // Create Document Component
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.h1}>MERN</Text>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              textAlign: "right",
            }}
          >
            <Text style={styles.purchaseDate}>05/13/2024 10:33 PM</Text>
            <Text style={styles.purchaseNumber}>Purchase ID: {id}</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <TableHeader length={products.length} />
          {products.map((p, index) => (
            <TableRow key={p.id} product={p} index={index} />
          ))}
          <TableFooter purchaseDetails={purchaseDetails} />
        </View>

        <View style={styles.footer}>
          <Text>Thank you for shopping with us!</Text>
        </View>
      </Page>
    </Document>
  );
}

const TableHeader = ({ length }: { length: number }) => {
  return (
    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderIndex}># / {length}</Text>
      <Text style={styles.tableHeaderName}>Item</Text>
      <Text style={styles.tableHeaderPrice}>Price</Text>
      <Text style={styles.tableHeaderQty}>Qty</Text>
    </View>
  );
};

const TableRow = ({ product, index }: { product: Product; index: number }) => {
  return (
    <View style={styles.tableRowContainer}>
      <Text style={styles.tableRowIndex}>{index + 1}</Text>
      <Text style={styles.tableRowName}>{product.name}</Text>
      <Text style={styles.tableRowPrice}>{product.price.toFixed(2)}</Text>
      <Text style={styles.tableRowQty}>1</Text>
    </View>
  );
};

const TableFooter = ({
  purchaseDetails,
}: {
  purchaseDetails: PurchaseDetails;
}) => {
  const total = purchaseDetails.products
    .map((p) => p.price)
    .reduce((prev, current) => {
      return prev + current;
    })
    .toFixed(2);
  const tax = (parseFloat(total) * 0.09).toFixed(2);
  const totalWithTax = (parseFloat(total) + parseFloat(tax)).toFixed(2);

  return (
    <View style={styles.tableFooterContainer}>
      <Text>
        Total: <Text style={styles.total}>${totalWithTax}</Text>
      </Text>
      <Text>
        Promo:{" "}
        <Text style={!purchaseDetails.promo ? styles.noPromo : styles.promo}>
          {purchaseDetails.promo || "N/A"}
        </Text>
      </Text>
    </View>
  );
};
