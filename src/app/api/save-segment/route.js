import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    try {
        console.log(body);
        return NextResponse.json({msg: 'Data has been sent Successfully!'})
    } catch (error) {
        return NextResponse.json(error.response.data, { status: error.response.status })
    }
}