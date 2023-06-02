import { NextResponse } from 'next/server';
import Url from '@/models/Url';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await dbConnect()
        if (id) {
            const data: any = await Url.findOne({ shortId: id })
            return NextResponse.json({ status: 200, data: { url: data.url } });
        } else {
            const data = await Url.find()
            return NextResponse.json({ status: 200, data: { urls: data } });
        }
    } catch (error) {
        return NextResponse.json({ status: 500, data: error });
    }
}

export async function POST(request: Request) {
    try {
        const { url, shortId } = await request.json();
        const lowerCaseUrl = url.toLowerCase();

        await dbConnect()

        const existingUrl = await Url.findOne({ url: lowerCaseUrl });

        if (existingUrl) {
            return NextResponse.json({ status: 200, data: { url: existingUrl } })
        }

        const newUrl = await Url.create({ url: lowerCaseUrl, shortId: shortId })
        return NextResponse.json({ status: 200, data: { url: newUrl } });
    } catch (error) {
        return NextResponse.json({ status: 400, data: error });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, shortId } = await request.json();
        const existingUrl = await Url.findOne({ _id: id });

        if (existingUrl) {
            existingUrl.shortId = shortId;
            await existingUrl.save();
            return NextResponse.json({ status: 200, data: { existingUrl } })
        } else {
            return NextResponse.json({ status: 404, data: 'URL Not Found!' });
        }
    } catch (error) {
        return NextResponse.json({ status: 400, data: error });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await dbConnect()
        const response = await Url.deleteOne({ _id: id });
        console.log(response)
        return NextResponse.json({ status: 200, message: 'URL deleted' });
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal server error' });

    }
}
