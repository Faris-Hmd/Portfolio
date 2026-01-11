import { ImageResponse } from "next/og";
import Image from "next/image";
export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <img src="/logo.png" alt="Logo" width={512} height={512} />,
    {
      width: 512,
      height: 512,
    },
  );
}
