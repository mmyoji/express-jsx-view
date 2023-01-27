export type IndexPageProps = {
  title: string;
  message: string;
};

export default function IndexPage({ title, message }: IndexPageProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <h1>Hello from JSX!</h1>
        <p>{message}</p>
      </body>
    </html>
  );
}
