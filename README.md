# Markdown Downloader for VS Code

Export your Markdown files to formatted PDF or Word (.docx) documents with a single click.

## Features

- **One-Click Export**: Instantly convert your current Markdown file.
- **High-Fidelity PDF**: Uses your local Chrome/Edge browser for perfect rendering, ensuring your PDF looks exactly like the preview.
- **Editable Word Docs**: Generates `.docx` files that are easy to edit and share.
- **Smart Styling**: Automatic GitHub-flavored styling for professional results.
- **Zero Config**: Works out of the box with no complex setup.

## Requirements

- **PDF Generation**: Requires a local installation of Google Chrome or Microsoft Edge.
- **Word Generation**: No external dependencies.

## Usage

1. Open a `.md` file in VS Code.
2. Click the **download PDF** or **download Word** icon in the editor title bar.
3. Alternatively, use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type:
    - `Markdown Downloader: Download as PDF`
    - `Markdown Downloader: Download as Word`

## Extension Settings

No settings required.

## Known Issues

- PDF generation depends on `puppeteer-core` finding a compatible browser executable on your system.

## Release Notes

### 0.0.1

- Initial release with PDF and Word export support.
