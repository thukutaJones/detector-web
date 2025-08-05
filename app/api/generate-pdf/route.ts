import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import path from "path";

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { htmlContent } = await req.json();
    if (!htmlContent) {
      console.error("No HTML content provided for PDF generation");
      return NextResponse.json({ error: "No HTML content provided" }, { status: 400 });
    }

    // Define the executable path for Chromium manually (Windows example)
    const executablePath = path.join(
      "E:\\detector\\detector\\web\\chrome\\win64-131.0.6778.204\\chrome-win64\\chrome.exe"
    );

    // Launch Puppeteer
    browser = await puppeteer.launch({
      executablePath, // Use the correct path for Chromium
      headless: true, // Change from "new" to true
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 60000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=receipt.pdf",
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error.message },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
