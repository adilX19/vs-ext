"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarkdownService_1 = require("./src/converter/MarkdownService");
const PdfService_1 = require("./src/converter/PdfService");
const WordService_1 = require("./src/converter/WordService");
const path = require("path");
async function test() {
    const md = "# Hello World\n\nThis is a **test** markdown file.\n\n- Item 1\n- Item 2";
    const mdService = new MarkdownService_1.MarkdownService();
    const pdfService = new PdfService_1.PdfService();
    const wordService = new WordService_1.WordService();
    console.log('Converting MD to HTML...');
    const html = mdService.convertToHtml(md);
    console.log('Generating PDF...');
    await pdfService.convertHtmlToPdf(html, path.join(__dirname, 'test.pdf'));
    console.log('PDF Generated at test.pdf');
    console.log('Generating Docx...');
    await wordService.convertHtmlToDocx(html, path.join(__dirname, 'test.docx'));
    console.log('Docx Generated at test.docx');
}
test().catch(err => console.error(err));
//# sourceMappingURL=test-conversion.js.map