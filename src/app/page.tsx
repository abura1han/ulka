import Image from "next/image";

export default async function page() {
  const color = ["#FFE4E6", "#CFFAFE"];

  const backgroundColor = color[Math.floor(Math.random() * color.length)];

  return (
    <div
      className="w-full h-screen flex items-center justify-between gap-4"
      style={{ backgroundColor }}
    >
      <div className="flex-[0.5] flex justify-center items-center flex-col">
        <Image
          src={"/icons/logo-full.svg"}
          alt="Ulka"
          width={200}
          height={200}
        />
        <div className="mt-6">
          <p>The calendar for the `Universe`</p>
        </div>
      </div>
      <div className="flex-[0.5] flex justify-center items-center flex-col h-full bg-black">
        <h2 className="text-white text-lg">Continue with -</h2>
        <button>Google</button>
      </div>
    </div>
  );
}
