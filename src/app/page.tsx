import Logo from "@/components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Logo />
      <h1>this is landing page</h1>
      <Link href={"/sign-in"}>sing-in</Link>
    </div>
  );
}
