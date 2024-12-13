import { createServer } from "http";
import request from "supertest";
import type { NextRequest } from "next/server";

export const createTestServer = (
  handler: (req: NextRequest, context: { params: Promise<{ id: string }> }) => Promise<Response>,
) => {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url!, "http://localhost");
    const id = url.pathname.split("/").pop();

    const body = await new Promise<Buffer>((resolve) => {
      const chunks: Uint8Array[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks)));
    });

    const nextRequest = new Request(url.toString(), {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: body.length ? body : undefined,
    });

    const response = await handler(nextRequest as NextRequest, {
      params: Promise.resolve({ id: id! }),
    });
    const headers: { [key: string]: string } = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    res.writeHead(response.status, headers);
    res.end(await response.text());
  });

  return request(server);
};
