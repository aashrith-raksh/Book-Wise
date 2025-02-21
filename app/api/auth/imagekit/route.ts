import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import config from "@/lib/config";

const { publicKey, privateKey, urlEndpoint } = config.env.imagekit;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
