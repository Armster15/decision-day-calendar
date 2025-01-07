// Cache for 3 days
export let revalidate = 60 * 60 * 72;
export const dynamicParams = true;
export const dynamic = "force-static";

// Gets first URL from "I'm Feeling Lucky" then uses that URL to get favicon
export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  console.log(`Generating image for ${query}`);

  const imFeelingLuckyRes = await fetch(
    `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}&btnI=I%27m+Feeling+Lucky`,
    { redirect: "manual" }
  );
  const location = imFeelingLuckyRes.headers.get("Location")!;
  const url = new URL(location).searchParams.get("q");

  const imageRes = await fetch(
    `https://www.google.com/s2/favicons?domain=${url}&sz=128`
  );

  return new Response(imageRes.body, {
    status: imageRes.status,
    headers: imageRes.headers,
  });
}
