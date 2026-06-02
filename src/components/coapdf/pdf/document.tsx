import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.cdnfonts.com/s/14882/Helvetica.woff', fontStyle: 'normal', fontWeight: 'normal' },
    { src: 'https://fonts.cdnfonts.com/s/14882/Helvetica-Bold.woff', fontStyle: 'normal', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 9,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    alignItems: 'flex-start',
  },
  logoContainer: { width: '35%' },
  logo: { width: 120, height: 78 },
  rightHeader: { fontSize: 14, marginBottom: 6 },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 10,
    textAlign: 'right',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 4,
  },
  qcCode: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 0,
    marginTop: 8,
    marginRight:40
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 4,
  },
  infoContainer: {
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 0,
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: '28%',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoValue: {
    width: '72%',
    fontSize: 12,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    minHeight: 0,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  tableColParameter: {
    width: '30%',
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 10,
  },
  tableColResult: {
    width: '20%',
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 10,
  },
  tableColRange: {
    width: '20%',
    padding: 2,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    fontSize: 10,
  },
  tableColMethod: {
    width: '30%',
    padding: 2,
    fontSize: 10,
  },
  heavyMetalNote: {
    fontSize: 10,
    fontStyle: 'italic',
    marginVertical: 2,
    textAlign: 'left',
  },
  signatureSection: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureSectionDate: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 30,
  },
  signatureBoxDate: {
    width: '30%',
    textAlign: 'left',
  },
  signatureBox: {
    width: '30%',
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    marginTop: 10,
    marginBottom: 2,
    width: '100%',
  },
  signatureLineDate: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    width: '100%',
  },
  signatureTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  signatureSubtitle: {
    fontSize: 9,
  },
 footer: {
    position: "absolute",
    bottom: 10,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
    paddingTop: 5,
  },

  leftFooterText: {
    fontSize: 8,
  },

  footerLogo: {
    width: 90,
    height: 40,
  },

  pageNumber: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
  },
});


interface COAPDFProps {
  data: any;
  companyInfo:any;
  COAInfo:any
}



export const COADocument: React.FC<COAPDFProps> = ({
  data,
  companyInfo,
  COAInfo
}) => {


   const logoUrl = "../images/logo/logo.png";
   const logoUrlFooter = "../images/logo/footerlogo.png";

  
 const buildRows = (data: any[]) => {
  const rows: any[] = [];
   let lastCategory: string | null = null;

  data.forEach((item) => {
    // Add header when category changes
    if (item.CategoryName !== lastCategory) {
      rows.push({
        type: "header",
        label: item.CategoryName,
      });

      lastCategory = item.CategoryName;
    }

    // Add actual row
    rows.push({
      type: "row",
      param: item.ParameterName,
      result: item.Result,
      range: item.Limits,
      method: item.Method,
    });
  });

  return rows;
};

const rows = buildRows(data);

 ; // grouped data

  // productName = "Organic Rice Syrup Brown DE-28",
  // productNumber = "MFOBRS28",
  // rnfItemNumber = "R0005",
  // productionDate = "January 21, 2026",
  // expiryDate = "July 21, 2027",
  // lotNumber = "MFRS21A26A-2",
  // sopNumber = "013595",
  // poNumber = "4500088667",
  // countryOfOrigin = "Pakistan",
  // supplierAddress = "G-205, Ahsan Abad Industrial Area, Super Highway, 75340, Karachi.",
 



  return (
    <Document author="Muhammad Ali Hussain" title={`CERTIFICATE OF ANALYSIS, ${new Date().getFullYear()}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src={logoUrl} style={styles.logo} />
          </View>
          <View style={styles.rightHeader}>
            <Text style={styles.companyName}>{companyInfo?.Name}</Text>
           <Text style={styles.companyAddress}>{companyInfo?.Address1}</Text>
            <Text style={styles.companyAddress}>{companyInfo?.Address2}</Text>
            <Text style={styles.contactLine}>Tel: {companyInfo?.ContactTell}</Text>
            <Text style={styles.contactLine}>Cell: { companyInfo?.ContactCell}</Text>
            <Text style={styles.contactLine}>Fax: {companyInfo?.Fax}</Text>
            <Text style={styles.contactLine}>Email: {companyInfo?.Email}</Text>
          </View>
        </View>

         <Text style={styles.qcCode}>{companyInfo?.Code}</Text>
        <Text style={styles.qcCode}> {companyInfo?.IssueNo}</Text>
        <Text style={styles.title}>{companyInfo?.Title}</Text>

        <View style={styles.infoContainer}>
           <View style={styles.infoRow}><Text style={styles.infoLabel}>Product:</Text><Text style={styles.infoValue}>{COAInfo?.ProductName}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Product Number:</Text><Text style={styles.infoValue}>{COAInfo?.ProductCode}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>RNF Item Number:</Text><Text style={styles.infoValue}>{COAInfo?.RFNItemNumber}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Production Date:</Text><Text style={styles.infoValue}>
                        
            {COAInfo?.ProductionDate ? new Date(COAInfo?.ProductionDate).toLocaleDateString() : " "}
            </Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Expiry Date:</Text><Text style={styles.infoValue}>
            
            {COAInfo?.ExpiryDate ? new Date(COAInfo?.ExpiryDate).toLocaleDateString() : " "}
          

          </Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Lot Number:</Text><Text style={styles.infoValue}>{COAInfo?.LotNumber}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>SOP#:</Text><Text style={styles.infoValue}>{COAInfo?.SalesId}</Text></View>
           {/* <View style={styles.infoRow}><Text style={styles.infoLabel}>PO#:</Text><Text style={styles.infoValue}>{poNumber}</Text></View> */}
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Country of Origin:</Text><Text style={styles.infoValue}>{COAInfo?.CountryOfOrigin}</Text></View>
          {/* <View style={styles.infoRow}><Text style={styles.infoLabel}>Supplier Address:</Text><Text style={styles.infoValue}>{supplierAddress}</Text></View>  */}
        </View>

       

    
  <View style={styles.table}>
  {rows.map((row, idx) => {
    const isEven = idx % 2 === 0;

    if (row.type === "header") {
      return (
        <View key={idx} style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableColParameter, { fontWeight: "bold" }]}>
            {row.label}
          </Text>
          <Text style={styles.tableColResult}>Results</Text>
          <Text style={styles.tableColRange}>Range</Text>
          <Text style={styles.tableColMethod}>Method</Text>
        </View>
      );
    }

    return (
      <View
        key={idx}
        style={[
          styles.tableRow,
          isEven ? styles.tableRowEven : styles.tableRowOdd,
        ]}
      >
        <Text style={styles.tableColParameter}>{row.param}</Text>
        <Text style={styles.tableColResult}>{row.result}</Text>
        <Text style={styles.tableColRange}>{row.range}</Text>
        <Text style={styles.tableColMethod}>{row.method}</Text>
      </View>
    );
  })}
</View>

   <View style={styles.signatureSection}>
  
    <View style={styles.signatureBox}>

  <Text >
  {COAInfo?.CreatedByName}
  </Text>

  <View style={[styles.signatureLine, { marginVertical: 5 }]} />
<Text style={styles.signatureTitle}>Checked By: </Text>
  <Text style={styles.signatureSubtitle}>
    (QA Officer)
  </Text>

</View>
          <View style={styles.signatureBox}>
            
  <Text >
  {COAInfo?.CheckedByName}
  </Text>


         <View style={[styles.signatureLine, { marginVertical: 5 }]} />
            <Text style={styles.signatureTitle}>Checked By:</Text>
            <Text style={styles.signatureSubtitle}>(Manager QA/QC)</Text>
          </View>
          <View style={styles.signatureBox}>
             <Text >
  {COAInfo?.ApprovedByName}
  </Text>

            <View  style={[styles.signatureLine, { marginVertical: 5 }]} />
            <Text style={styles.signatureTitle}>Approved By:</Text>
            <Text style={styles.signatureSubtitle}>(Head of QA/QC- PCQI)</Text>
          </View>
        </View>

        <View style={styles.signatureSectionDate}>
          <View style={styles.signatureBoxDate}>
            <Text>Date:</Text>
            <View style={styles.signatureLineDate} />
          </View>
          <View style={styles.signatureBoxDate}>
            <Text>Time:</Text>
            <View style={styles.signatureLineDate} />
          </View>
        </View>


        <View  style={{
      position: 'absolute',
      bottom: 0,
      left: 30,
      right: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }} fixed>
          <Text style={styles.leftFooterText}>visit us at: www.matcofoods.com, www.falakrice.com</Text>
          {logoUrlFooter && <Image src={logoUrlFooter} style={styles.footerLogo} />}
        </View> 

        <Text fixed style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
};