import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <nav className="bg-purple-700 h-16 px-12 flex items-center">
        <ul className="flex  items-center h-full  space-x-8">
          <li className="text-white font-bold text-xl mr-12">
            <a href="#" className="hover:text-purple-200">
              Shopping
            </a>
          </li>

          <li className="text-white font-bold text-md ">
            <a href="#" className="hover:text-purple-200">
              Home
            </a>
          </li>

          <li className="text-white font-bold text-md ">
            <a href="#" className="hover:text-purple-200">
              Categories
            </a>
          </li>
        </ul>
        <ul className="ml-auto flex  items-center h-full  space-x-8">
          <li className="text-white font-bold text-md ">
            <a href="/login" className="hover:text-purple-200">
              Login
            </a>
          </li>

          <li className="text-white font-bold text-md ">
            <a
              href="#"
              className="hover:bg-green-700 bg-green-600 px-4 py-2 transition shadow-md"
            >
              Signup
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
