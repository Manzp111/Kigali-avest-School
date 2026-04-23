export async function GET() {
  return Response.json([
    {
      id: 1,
      image: "/images/10.png",
      alt: "Students studying"
    },
    {
      id: 2,
      image: "/images/DSC_3831.jpg",
      alt: "School trip"
    }
  ]);
}