// @ts-ignore
import * as HTMLtoDOCX from 'html-to-docx';
import * as fs from 'fs';

export class WordService {
    public async convertHtmlToDocx(html: string, outputPath: string): Promise<void> {
        try {
            const fileBuffer = await HTMLtoDOCX(html, null, {
                table: { row: { cantSplit: true } },
                footer: true,
                pageNumber: true,
            });

            await fs.promises.writeFile(outputPath, fileBuffer);
        } catch (error) {
            console.error('Error generating Word document:', error);
            throw error;
        }
    }
}
