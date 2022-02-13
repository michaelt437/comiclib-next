import Link from "next/link";

export default function Header () {
  return (
    <div className="font-bold bg-sky-600">
      <div className="container flex justify-between items-center text-gray-200">
        <h1 className="text-gray-200 text-xl">Comics Library</h1>
        <nav>
          <ul>
            <li className="cursor-pointer">
              <Link href="/wishlist">
                <a>Wishlist</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
