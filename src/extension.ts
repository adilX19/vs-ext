import * as vscode from 'vscode';
import * as path from 'path';
import { MarkdownService } from './converter/MarkdownService';
import { PdfService } from './converter/PdfService';
import { WordService } from './converter/WordService';

export function activate(context: vscode.ExtensionContext) {
    const mdService = new MarkdownService();
    const pdfService = new PdfService();
    const wordService = new WordService();

    let downloadPdfDisposable = vscode.commands.registerCommand('markdown-downloader.downloadPdf', async (uri: vscode.Uri) => {
        await handleDownloadFor('pdf', uri, mdService, pdfService, wordService);
    });

    let downloadDocxDisposable = vscode.commands.registerCommand('markdown-downloader.downloadDocx', async (uri: vscode.Uri) => {
        await handleDownloadFor('docx', uri, mdService, pdfService, wordService);
    });

    context.subscriptions.push(downloadPdfDisposable);
    context.subscriptions.push(downloadDocxDisposable);
}

async function handleDownloadFor(
    type: 'pdf' | 'docx',
    uri: vscode.Uri | undefined,
    mdService: MarkdownService,
    pdfService: PdfService,
    wordService: WordService
) {
    try {
        // If URI is passed (from context menu), use it. Otherwise use active editor.
        let targetUri = uri;
        if (!targetUri) {
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                targetUri = activeEditor.document.uri;
            }
        }

        if (!targetUri) {
            vscode.window.showErrorMessage('No file selected.');
            return;
        }

        const document = await vscode.workspace.openTextDocument(targetUri);
        if (document.languageId !== 'markdown') {
            vscode.window.showErrorMessage('File is not a Markdown file.');
            return;
        }

        const markdownContent = document.getText();
        const htmlContent = mdService.convertToHtml(markdownContent);

        // Prompt for save location
        const defaultFileName = path.basename(targetUri.fsPath, path.extname(targetUri.fsPath)) + '.' + type;
        const saveUri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(path.join(path.dirname(targetUri.fsPath), defaultFileName)),
            filters: type === 'pdf' ? { 'PDF': ['pdf'] } : { 'Word Document': ['docx'] }
        });

        if (!saveUri) {
            return; // User cancelled
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Converting to ${type.toUpperCase()}...`,
            cancellable: false
        }, async (progress) => {
            if (type === 'pdf') {
                await pdfService.convertHtmlToPdf(htmlContent, saveUri.fsPath);
            } else {
                await wordService.convertHtmlToDocx(htmlContent, saveUri.fsPath);
            }
        });

        vscode.window.showInformationMessage(`Successfully converted to ${type.toUpperCase()}!`);
    } catch (error: any) {
        vscode.window.showErrorMessage(`Conversion failed: ${error.message}`);
    }
}

