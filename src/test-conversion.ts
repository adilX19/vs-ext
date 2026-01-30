import { MarkdownService } from './converter/MarkdownService';
import { PdfService } from './converter/PdfService';
import { WordService } from './converter/WordService';
import * as path from 'path';

async function test() {
    const md = "# Hello World\n\nThis is a **test** markdown file.\n\n- Item 1\n- Item 2";
    const mdService = new MarkdownService();
    const pdfService = new PdfService();
    const wordService = new WordService();

    console.log('Converting MD to HTML...');
    const html = mdService.convertToHtml(md);
    
    console.log('Generating PDF...');
    await pdfService.convertHtmlToPdf(html, path.join(__dirname, '../test.pdf'));
    console.log('PDF Generated at test.pdf');

    console.log('Generating Docx...');
    await wordService.convertHtmlToDocx(html, path.join(__dirname, '../test.docx'));
    console.log('Docx Generated at test.docx');
}

test().catch(err => console.error(err));
