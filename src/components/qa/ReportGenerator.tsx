'use client';

import { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';

// Styles (same as before)
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  address: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 2,
  },
  contact: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 2,
  },
  email: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 4,
  },
  docRef: {
    fontSize: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  infoValue: {
    width: '70%',
  },
  table: {
    marginTop: 8,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    padding: 4,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  colAttr: { width: '35%' },
  colResult: { width: '15%' },
  colRange: { width: '20%' },
  colMethod: { width: '30%' },
  colHeavyAttr: { width: '40%' },
  colHeavyResult: { width: '20%' },
  colHeavyRange: { width: '40%' },
  note: {
    fontSize: 7,
    color: '#555',
    marginVertical: 4,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signatureItem: {
    alignItems: 'center',
    width: '30%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    marginBottom: 4,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

const formatRange = (limits, unit) => {
  let range = limits || '';
  if (unit && !range.includes(unit)) range += ` ${unit}`;
  return range.trim();
};

// PDF Document (receives header and grouped tests)
const COADocument = ({ header, groupedTests }) => {
  const attributesRows = (groupedTests['Attributes'] || []).map(item => ({
    param: item.ParameterName,
    result: item.Result || '—',
    range: formatRange(item.Limits, item.Unit),
    method: item.Method || '',
  }));

  const microRows = (groupedTests['Microbiological Attributes'] || []).map(item => ({
    param: item.ParameterName,
    result: item.Result || '—',
    range: formatRange(item.Limits, item.Unit),
    method: item.Method || '',
  }));

  const heavyRows = (groupedTests['Heavy Metals'] || []).map(item => ({
    param: item.ParameterName,
    result: item.Result || '—',
    range: item.Limits || '',
  }));

  const heavyNote = "Based on Journal of Food & Drug Analysis Vol. 12 No.2 2004/ American Eurasian J. Agri & Env. Sci, 6(91): 16-19/2009 (LOD=20 ppb)";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <Text style={styles.companyName}>MATCO FOODS LIMITED</Text>
        <Text style={styles.address}>B-1/A, S.I.T.E., Phase 1, Super Highway Industrial Area, Karachi - 75340.</Text>
        <Text style={styles.contact}>Tel: +92 21 36411661-3  Cell: +92 300 8610651  Fax: +92 21 36881443</Text>
        <Text style={styles.email}>Email: contact@matcafoods.com</Text>
        <View style={styles.divider} />
        <Text style={styles.docRef}>QC/4/06 Issue {header.issueNumber || '4'}</Text>
        <Text style={styles.title}>CERTIFICATE OF ANALYSIS</Text>

        {/* Product Info Box */}
        <View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Product:</Text>
            <Text style={styles.infoValue}>{header.product}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Product Number:</Text>
            <Text style={styles.infoValue}>{header.productNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>RNF Item Number:</Text>
            <Text style={styles.infoValue}>{header.rnfItemNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Production Date:</Text>
            <Text style={styles.infoValue}>{header.productionDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Expiry Date:</Text>
            <Text style={styles.infoValue}>{header.expiryDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lot Number:</Text>
            <Text style={styles.infoValue}>{header.lotNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SOP#:</Text>
            <Text style={styles.infoValue}>{header.sopNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PO#:</Text>
            <Text style={styles.infoValue}>{header.poNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Country of Origin:</Text>
            <Text style={styles.infoValue}>{header.countryOfOrigin}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Supplier Address:</Text>
            <Text style={styles.infoValue}>{header.supplierAddress}</Text>
          </View>
        </View>

        {/* Attributes Table */}
        {attributesRows.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colAttr}>Attributes</Text>
              <Text style={styles.colResult}>Results</Text>
              <Text style={styles.colRange}>Range</Text>
              <Text style={styles.colMethod}>Method</Text>
            </View>
            {attributesRows.map((row, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.colAttr}>{row.param}</Text>
                <Text style={styles.colResult}>{row.result}</Text>
                <Text style={styles.colRange}>{row.range}</Text>
                <Text style={styles.colMethod}>{row.method}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Microbiological Table */}
        {microRows.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colAttr}>Microbiological</Text>
              <Text style={styles.colResult}>Results</Text>
              <Text style={styles.colRange}>Range</Text>
              <Text style={styles.colMethod}>Method</Text>
            </View>
            {microRows.map((row, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.colAttr}>{row.param}</Text>
                <Text style={styles.colResult}>{row.result}</Text>
                <Text style={styles.colRange}>{row.range}</Text>
                <Text style={styles.colMethod}>{row.method}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Heavy Metals Table */}
        {heavyRows.length > 0 && (
          <>
            <Text style={styles.note}>{heavyNote}</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.colHeavyAttr}>Heavy Metals</Text>
                <Text style={styles.colHeavyResult}>Results</Text>
                <Text style={styles.colHeavyRange}>Range</Text>
              </View>
              {heavyRows.map((row, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.colHeavyAttr}>{row.param}</Text>
                  <Text style={styles.colHeavyResult}>{row.result}</Text>
                  <Text style={styles.colHeavyRange}>{row.range}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Signatures */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureItem}>
            <View style={styles.signatureLine} />
            <Text>Prepared By: (QA Officer)</Text>
          </View>
          <View style={styles.signatureItem}>
            <View style={styles.signatureLine} />
            <Text>Checked By: (Manager QA/QC)</Text>
          </View>
          <View style={styles.signatureItem}>
            <View style={styles.signatureLine} />
            <Text>Approved By: (Head of QA/QC - PCQI)</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} fixed>Page 1 of 1</Text>
      </Page>
    </Document>
  );
};

// Main component: extracts header from testResults[0]
export default function COAPDFGenerator({ id }) {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    try {
      // 1. Fetch test results (array)
      const res = await fetch(`/api/qa/generate-coa-pdf/${id}`);
      const result = await res.json();
      const testResults = result.data; // array of test objects

      if (!testResults || testResults.length === 0) {
        throw new Error('No test results found');
      }

      // 2. Extract header from the first test result object
      const first = testResults[0];
      const header = {
        TestResultID: first.TestResultID,
        CategoryName: first.CategoryName,
        ParameterName: first.ParameterName,
        Limits: first.Limits,
        Result: first.Result,
        Method: first.Method,
        
      };

      // 3. Group test results by CategoryName
      const grouped = {};
      testResults.forEach(item => {
        const cat = item.CategoryName;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
      });

      // 4. Generate PDF blob
      const blob = await pdf(<COADocument header={header} groupedTests={grouped} />).toBlob();

      // 5. Download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `COA_${header.lotNumber || id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to generate COA: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={loading}
      style={{
        padding: '10px 18px',
        background: '#1f2937',
        color: 'white',
        borderRadius: 6,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'Generating...' : 'Download COA PDF'}
    </button>
  );
}