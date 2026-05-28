import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import type { Resume } from '@/lib/constants';
import { Watermark } from './watermark';
import { Heading } from './heading';
import { Section } from './section';
import { Experience } from './experience';
import { Education } from './education';
import { Project } from './project';
import { Skill } from './skill';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingHorizontal: 50,
    fontFamily: 'Ubuntu',
    fontSize: 10,
    paddingBottom: 36,
  },
  twoColumn: {
    flexDirection: 'row',
  },
  left: {
    flexGrow: 1,
    marginRight: 16,
    width: '55%',
  },
  right: {
    flexGrow: 1,
    width: '40%',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 24,
    left: 0,
    right: 35,
    textAlign: 'right',
    color: '#64748b',
  },
});

type ResumeDocumentProps = {
  resume: Resume;
};

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ resume }) => {
  return (
    <Document
      author='Muhammad Ali Hussain'
      title={`CERTIFICATE OF ANALYSIS, ${new Date().getFullYear()}`}
    >
      <Page size='A4' style={styles.page}>
       
        
       
        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};
