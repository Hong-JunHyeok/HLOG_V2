export default function imageFormat(url: string) {
  return `${process.env.NEXT_PUBLIC_API_SERVER_URL}/${url}`;
}
