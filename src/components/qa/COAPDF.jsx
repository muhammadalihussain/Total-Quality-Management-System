import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 25,
  },
});

export default function COAPdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>COA No: {data.coaNo}</Text>
      </Page>
    </Document>
  );
}