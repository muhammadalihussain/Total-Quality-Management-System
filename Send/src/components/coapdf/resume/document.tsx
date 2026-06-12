import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts for better appearance
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/14882/Helvetica.woff', fontStyle: 'normal', fontWeight: 'normal' },
    { src: 'https://fonts.cdnfonts.com/s/14882/Helvetica-Bold.woff', fontStyle: 'normal', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({

companyInfoContainer:{

},

companyAddress:{}
,
contactLine:{},
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 15,
},

logoContainer: {
  width: '20%',
},

logo: {
  width: 100,
  height: 80,
  objectFit: 'contain',
},

rightHeader: {
  width: '45%',
  alignItems: 'flex-end',
},

companyName: {
  fontSize: 13,
  fontWeight: 'bold',
  textAlign: 'right',
  marginBottom: 2,
},

companyLine: {
  fontSize: 8,
  textAlign: 'right',
  lineHeight: 1.2,
  marginBottom: 1,
},
  emptySpace: {
    width: '20%',
  },
  qcCode: {
    fontSize: 9,
    textAlign: 'right',
    marginBottom: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
   // textDecoration: 'underline',
    letterSpacing: 1,
  },
  // Info Section
  infoContainer: {
    marginBottom: 10,
   // borderWidth: 1,
    borderColor: '#000000',
    padding: 6,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 9,
  },
  infoValue: {
    width: '70%',
    fontSize: 9,
  },
  // Table Section
  table: {
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    minHeight: 18,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableColParameter: {
    width: '30%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 8,
  },
  tableColResult: {
    width: '20%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 8,
  },
  tableColRange: {
    width: '20%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 8,
  },
  tableColMethod: {
    width: '30%',
    padding: 5,
    fontSize: 8,
  },
  // Footer Section
  signatureSection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '30%',
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    marginTop: 40,
    marginBottom: 5,
    width: '100%',
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  signatureSubtitle: {
    fontSize: 8,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    color: '#666666',
  },
  footerNote: {
    marginTop: 20,
    fontSize: 7,
    textAlign: 'center',
    color: '#666666',
  },
  heavyMetalNote: {
    fontSize: 7,
    fontStyle: 'italic',
    marginBottom: 10,
    marginTop: 5,
    textAlign: 'left',
  },
});

interface COAPDFProps {
  // Product Information
  productName?: string;
  productNumber?: string;
  rnfItemNumber?: string;
  productionDate?: string;
  expiryDate?: string;
  lotNumber?: string;
  sopNumber?: string;
  poNumber?: string;
  countryOfOrigin?: string;
  supplierAddress?: string;
  logoUrl?: string; // Add logo URL prop
  // Test Results
  testResults?: any;
}

export const ResumeDocument: React.FC<COAPDFProps> = ({
  productName = "Organic Rice Syrup Brown DE-28",
  productNumber = "MFOBRS28",
  rnfItemNumber = "R0005",
  productionDate = "January 21, 2026",
  expiryDate = "July 21, 2027",
  lotNumber = "MFRS21A26A-2",
  sopNumber = "013595",
  poNumber = "4500088667",
  countryOfOrigin = "Pakistan",
  supplierAddress = "G-205, Ahsan Abad Industrial Area, Super Highway, 75340, Karachi.",
  logoUrl = "../images/logo/logo.png", // Path to your logo image in public folder
  testResults = {
    moisture: { value: "19.9", range: "19-21", method: "Refractometer" },
    ph: { value: "5.3", range: "4.5-6.5", method: "AOAC 945.27" },
    brix: { value: "80.1", range: "79.5-81.5", method: "AOAC 932.14" },
    de: { value: "31.5", range: "26-32", method: "AOAC 923.09" },
    glucose: { value: "5.2", range: "3.5-8.5", method: "HPLC" },
    maltose: { value: "12.0", range: "8.5-20", method: "HPLC" },
    otherCarbohydrates: { value: "82.8", range: "70-86", method: "HPLC" },
    color: { value: "Extra Light Amber", range: "Extra Light Amber", method: "Visual" },
    flavor: { value: "Sweet", range: "Sweet", method: "Organoleptic" },
    ash: { value: "0.15", range: "<0.20", method: "" },
    totalPlateCount: { value: "<100", range: "<500", method: "BAM-FDA online Chapter 3" },
    osmophilicMold: { value: "<10", range: "<100", method: "BAM-FDA online Chapter 18" },
    osmophilicYeast: { value: "<10", range: "<100", method: "BAM-FDA online Chapter 18" },
    eColi: { value: "Nil", range: "<10", method: "BAM-FDA online Chapter 04" },
    coliforms: { value: "Nil", range: "<10", method: "BAM-FDA online Chapter 04" },
    salmonella: { value: "Nil", range: "Nil", method: "BAM-FDA online Chapter 5" },
    lead: { value: "N/D", range: "<50", method: "Based on Journal of Food & Drug Analysis Vol. 12 No.2 2004" },
    arsenic: { value: "N/D", range: "<100", method: "American Eurasian J. Agri & Env. Sci, 6 91): 16-19/2009 (LOD=20 ppb)" },
  }
}) => {
  return (
    <Document
      author="Muhammad Ali Hussain"
      title={`CERTIFICATE OF ANALYSIS, ${new Date().getFullYear()}`}
    >
      <Page size="A4" style={styles.page}>
          {/* Right Company Info */}
       <View style={styles.header}>
     {/* Left Logo */}
  <View style={styles.logoContainer}>
    <Image src={logoUrl} style={styles.logo}  />
  </View>

            {/* Right Company Info */}
          <View style={styles.companyInfoContainer}>
            <Text style={styles.companyName}>MATCO FOODS LIMITED</Text>
            <Text style={styles.companyAddress}>B-1/A, S.I.T.E., Phase 1, Super Highway</Text>
            <Text style={styles.companyAddress}>Industrial Area, Karachi - 75340.</Text>
            <Text style={styles.contactLine}>Tel: +92 21 36411661-3</Text>
            <Text style={styles.contactLine}>Cell: +92 300 8610651</Text>
            <Text style={styles.contactLine}>Fax: +92 21 36881443</Text>
            <Text style={styles.contactLine}>Email: contact@matcafoods.com</Text>
          </View>


        </View>

        {/* QC Code */}
        <Text style={styles.qcCode}>QC/4/06 Issue 4</Text>

        {/* Title */}
        <Text style={styles.title}>CERTIFICATE OF ANALYSIS</Text>

        {/* Product Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Product:</Text>
            <Text style={styles.infoValue}>{productName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Product Number:</Text>
            <Text style={styles.infoValue}>{productNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>RNF Item Number:</Text>
            <Text style={styles.infoValue}>{rnfItemNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Production Date:</Text>
            <Text style={styles.infoValue}>{productionDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Expiry Date:</Text>
            <Text style={styles.infoValue}>{expiryDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lot Number:</Text>
            <Text style={styles.infoValue}>{lotNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SOP#:</Text>
            <Text style={styles.infoValue}>{sopNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PO#:</Text>
            <Text style={styles.infoValue}>{poNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Country of Origin:</Text>
            <Text style={styles.infoValue}>{countryOfOrigin}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Supplier Address:</Text>
            <Text style={styles.infoValue}>{supplierAddress}</Text>
          </View>
        </View>

        {/* Test Results Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColParameter}>Attributes</Text>
            <Text style={styles.tableColResult}>Results</Text>
            <Text style={styles.tableColRange}>Range</Text>
            <Text style={styles.tableColMethod}>Method</Text>
          </View>

          {/* Table Body - Attributes */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Moisture</Text>
            <Text style={styles.tableColResult}>{testResults.moisture.value}</Text>
            <Text style={styles.tableColRange}>{testResults.moisture.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.moisture.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>pH (50% solution)</Text>
            <Text style={styles.tableColResult}>{testResults.ph.value}</Text>
            <Text style={styles.tableColRange}>{testResults.ph.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.ph.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>°Brix%</Text>
            <Text style={styles.tableColResult}>{testResults.brix.value}</Text>
            <Text style={styles.tableColRange}>{testResults.brix.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.brix.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Dextrose Equivalent (DE %)</Text>
            <Text style={styles.tableColResult}>{testResults.de.value}</Text>
            <Text style={styles.tableColRange}>{testResults.de.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.de.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Glucose (as % of solids)</Text>
            <Text style={styles.tableColResult}>{testResults.glucose.value}</Text>
            <Text style={styles.tableColRange}>{testResults.glucose.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.glucose.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Maltose (as % of solids)</Text>
            <Text style={styles.tableColResult}>{testResults.maltose.value}</Text>
            <Text style={styles.tableColRange}>{testResults.maltose.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.maltose.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Other Carbohydrates</Text>
            <Text style={styles.tableColResult}>{testResults.otherCarbohydrates.value}</Text>
            <Text style={styles.tableColRange}>{testResults.otherCarbohydrates.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.otherCarbohydrates.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Color</Text>
            <Text style={styles.tableColResult}>{testResults.color.value}</Text>
            <Text style={styles.tableColRange}>{testResults.color.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.color.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Flavor</Text>
            <Text style={styles.tableColResult}>{testResults.flavor.value}</Text>
            <Text style={styles.tableColRange}>{testResults.flavor.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.flavor.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Ash%</Text>
            <Text style={styles.tableColResult}>{testResults.ash.value}</Text>
            <Text style={styles.tableColRange}>{testResults.ash.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.ash.method}</Text>
          </View>

          {/* Microbiological Attributes Section */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColParameter}>Microbiological Attributes</Text>
            <Text style={styles.tableColResult}>Results</Text>
            <Text style={styles.tableColRange}>Range</Text>
            <Text style={styles.tableColMethod}>Method</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Total Plate Count (cfu/g)</Text>
            <Text style={styles.tableColResult}>{testResults.totalPlateCount.value}</Text>
            <Text style={styles.tableColRange}>{testResults.totalPlateCount.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.totalPlateCount.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Osmophilic Mold (cfu/g)</Text>
            <Text style={styles.tableColResult}>{testResults.osmophilicMold.value}</Text>
            <Text style={styles.tableColRange}>{testResults.osmophilicMold.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.osmophilicMold.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Osmophilic Yeast (cfu/g)</Text>
            <Text style={styles.tableColResult}>{testResults.osmophilicYeast.value}</Text>
            <Text style={styles.tableColRange}>{testResults.osmophilicYeast.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.osmophilicYeast.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>E-Coli (cfu/g)</Text>
            <Text style={styles.tableColResult}>{testResults.eColi.value}</Text>
            <Text style={styles.tableColRange}>{testResults.eColi.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.eColi.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Coliforms (cfu/g)</Text>
            <Text style={styles.tableColResult}>{testResults.coliforms.value}</Text>
            <Text style={styles.tableColRange}>{testResults.coliforms.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.coliforms.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Salmonella (per 25 g)</Text>
            <Text style={styles.tableColResult}>{testResults.salmonella.value}</Text>
            <Text style={styles.tableColRange}>{testResults.salmonella.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.salmonella.method}</Text>
          </View>

          {/* Heavy Metals Section */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColParameter}>Heavy Metals</Text>
            <Text style={styles.tableColResult}>Results</Text>
            <Text style={styles.tableColRange}>Range</Text>
            <Text style={styles.tableColMethod}>Method</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Lead (ppb)</Text>
            <Text style={styles.tableColResult}>{testResults.lead.value}</Text>
            <Text style={styles.tableColRange}>{testResults.lead.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.lead.method}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableColParameter}>Arsenic (ppb)</Text>
            <Text style={styles.tableColResult}>{testResults.arsenic.value}</Text>
            <Text style={styles.tableColRange}>{testResults.arsenic.range}</Text>
            <Text style={styles.tableColMethod}>{testResults.arsenic.method}</Text>
          </View>
        </View>

        {/* Heavy Metals Reference Note */}
        <Text style={styles.heavyMetalNote}>
          Heavy Metals Based on: Journal of Food & Drug Analysis Vol. 12 No.2 2004/ American Eurasian J. Agri & Env. Sci, 6 91): 16-19/2009 (LOD=20 ppb)
        </Text>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Prepared By:</Text>
            <Text style={styles.signatureSubtitle}>(QA Officer)</Text>
          </View>

          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Checked By:</Text>
            <Text style={styles.signatureSubtitle}>(Manager QA/QC)</Text>
          </View>

          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Approved By:</Text>
            <Text style={styles.signatureSubtitle}>(Head of QA/QC- PCQI)</Text>
          </View>
        </View>

        {/* Page Number */}
        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};