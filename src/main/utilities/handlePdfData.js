const fs = require('fs')

const PDFParser = require("pdf2json")

const pdfParser = new PDFParser();



function getPdfCreationDate(path) {

  pdfParser.on("readable", meta => console.log("PDF Metadata", meta));

  pdfParser.loadPDF(path);//load pdf on path
}
