export default async function Page({ params }: { params: { appId: string } }) {
  console.log(params.appId);

  return <div></div>;
}

