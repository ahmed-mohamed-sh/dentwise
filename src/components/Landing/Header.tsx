"use client"; // أضف هذا في السطر الأول

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

function Header() {
    return <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-border/50 bg-background/80 backdrop-blur-md h-16 ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link 
                href="/" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}  
                className="flex items-center gap-2"
            >
                <Image src="/logo.png" alt="logo" width={32} height={32} className="w-11"/>
                <span className="font-semibold text-lg">DentWise</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                    How it works
                </a>
                 <a href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                </a>
                 <a href="#" className="text-muted-foreground hover:text-foreground">
                    About
                </a>
            </div>
            <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                    <Button variant={"ghost"} size={"sm"}>Login</Button>
                </SignInButton> 
                <SignUpButton mode="modal">
                    <Button size={"sm"}>Sign Up</Button>
                </SignUpButton>
            </div>
        </div>
    </nav>
}

export default Header