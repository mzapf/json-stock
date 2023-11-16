import { format } from 'date-fns';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 10,
        paddingTop: 30
    },
    header: {
        position: 'absolute',
        right: 10,
        top: 10,
        fontSize: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColFirstHeader: {
        width: "55%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    tableFirstCol: {
        width: "55%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        alignItems: "center",
        justifyContent: "center"
    }, tableColHeader: {
        width: "15%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    tableCol: {
        width: "15%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 10,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 8
    },
});

const GetDifference = (originalValue, adjustedValue) => {
    const difference = adjustedValue - originalValue;
    return difference > 0 ? `+${difference}` : difference;
};

const MyDocument = ({ differences }) => {
    const currentDate = format(new Date(), 'HH:mm dd/MM/yyyy');

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>{currentDate}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstHeader}>
                            <Text style={styles.tableCellHeader}>Item</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Stock</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Sistema</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Diferencia</Text>
                        </View>
                    </View>
                    {Object.entries(differences).map(([category, subcategories]) =>
                        Object.entries(subcategories).map(([subcategory, items]) =>
                            items.map((item) => (
                                <View style={styles.tableRow} key={`${category}-${subcategory}-${item.item}`}>
                                    <View style={styles.tableFirstCol}>
                                        <Text style={styles.tableCell}>{`${category} ${subcategory} ${item.item}`}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{item.adjustedValue}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{item.originalValue}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{GetDifference(item.originalValue, item.adjustedValue)}</Text>
                                    </View>
                                </View>
                            ))
                        )
                    )}
                </View>
            </Page>
        </Document>
    );
};

const SaveToPDF = ({ differences }) => {
    const fileName = `stock-${format(new Date(), 'ddMMyy')}.pdf`;
    return (
        <button className="bg-orange-500 text-white py-2 px-4 rounded mt-4">
            <PDFDownloadLink
                document={<MyDocument differences={differences} />}
                fileName={fileName}
            >
                {({ blob, url, loading, error }) =>
                    loading ? 'Cargando documento...' : 'Descargar Resumen'
                }
            </PDFDownloadLink>
        </button>
    );
};

export default SaveToPDF;