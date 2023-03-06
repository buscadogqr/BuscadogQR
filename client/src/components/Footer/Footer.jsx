import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer class="p-4 bg-buscabrown shadow md:flex md:items-center md:justify-between md:p-6 mt-auto w-full bottom-0 right-0">
            <span class="text-sm text-white sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">BuscadogQR</a>. All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
                <li>
                    <Link to="/about">
                        <h class="mr-4 hover:underline md:mr-6 ">About</h>
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <h class="hover:underline">Contact</h>
                    </Link>
                </li>
            </ul>
        </footer>
    )
};
