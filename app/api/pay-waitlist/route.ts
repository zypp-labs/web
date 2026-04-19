import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Cache the document and sheet globally to avoid redundant authentications & loads
let cachedSheet: GoogleSpreadsheetWorksheet | null = null;

async function getSheet() {
    if (cachedSheet) return cachedSheet;

    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
        throw new Error("Missing Google Sheets credentials in .env");
    }

    const serviceAccountAuth = new JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    cachedSheet = doc.sheetsByIndex[0];
    return cachedSheet;
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        if (!name) return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });

        const sheet = await getSheet();

        // 1. Fetch existing rows to check for uniqueness
        // To keep it very fast, we only fetch the 'Name' and 'Email' columns if possible, but fetching all is standard
        const rows = await sheet.getRows();

        const emailExists = rows.some((row: GoogleSpreadsheetRow) => row.get('Email')?.trim().toLowerCase() === email.trim().toLowerCase());
        if (emailExists) {
            return NextResponse.json({ error: `The email "${email}" is already on the waitlist.` }, { status: 409 });
        }

        const nameExists = rows.some((row: GoogleSpreadsheetRow) => row.get('Name')?.trim().toLowerCase() === name.trim().toLowerCase());
        if (nameExists) {
            return NextResponse.json({ error: `The name "${name}" is already on the waitlist.` }, { status: 409 });
        }

        // 2. Append row
        await sheet.addRow({
            Timestamp: new Date().toISOString(),
            Name: name.trim(),
            Email: email.trim().toLowerCase(),
            Message: message || ''
        });

        return NextResponse.json({ success: true, message: 'Successfully joined waitlist!' }, { status: 201 });
    } catch (error: unknown) {
        console.error('Waitlist signup error:', error);
        if (error instanceof Error && error.message?.includes('credentials')) {
            return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'Failed to join waitlist. Please try again later.' },
            { status: 500 }
        );
    }
}
