'use client';
import { useState } from "react";
import { Wrench, X } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { customAlphabet, urlAlphabet } from "nanoid";
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from "next/image"


export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_URL;
  const [showCustomLink, setShowCustomLink] = useState<boolean>(false);
  const [shorten, setShorten] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const { url, keyword } = e.target;
      const nanoid = customAlphabet(urlAlphabet, 4);
      const res = await fetch('/api/', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url.value,
          shortId: keyword.value ? keyword.value : nanoid()
        })
      });
      const response = await res.json();
      if (response.status === 200) {
        setShorten(`${siteUrl}/${response.data.url.shortId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const copyToClipboard = async () => {
    try {
      if (shorten) {
        await navigator.clipboard.writeText(shorten);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={`flex min-h-screen flex-col justify-center items-center ${styles.wallpaper}`}>
      {!shorten ? (
        <Card className="max-w-xl justify-center md:max-w-2xl relative">
          <CardHeader>
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <Image src="/assets/logo.png" alt="Shortify" height="100" width="95" />
            </div>
          </CardHeader>
          <CardContent className="md:mx-10 text-sm">
            <p className="leading-relaxed md:mx-20 my-6">
              Shortify is a user-friendly URL shortening tool that lets you create custom, easy-to-remember links to share anywhere.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex w-full items-center space-x-1 flex-wrap md:flex-nowrap gap-y-3">
                <Input name="url" className="h-12 bg-gray-300" type="url" placeholder="PASTE URL, SHORTEN AND SHARE" required />
                <Button type="submit" className="uppercase h-12 w-full md:w-auto">Shorten</Button>
              </div>
              <div className="flex space-x-2 items-center uppercase my-4">
                <Wrench size={14} />
                <p
                  className="text-sm cursor-pointer font-semibold"
                  onClick={() => setShowCustomLink(!showCustomLink)}
                >
                  Customize Link
                </p>
              </div>
              <div className={`my-4 ${!showCustomLink && 'hidden'}`}>
                <Input name="keyword" type="text" id="shortId-2" placeholder="Custom Keyword" />
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-xl justify-center md:max-w-2xl p-4">
          <X size={24} className="float-right cursor-pointer" strokeWidth={3} onClick={() => setShorten(null)} />
          <CardHeader>
            <h2 className="text-2xl font-bold">YOUR SHORTENED LINK:</h2>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-1 flex-wrap md:flex-nowrap gap-y-3">
              <Input className="h-12 bg-gray-300" type="url" value={`${shorten}`} readOnly />
              <Button onClick={copyToClipboard} type="submit" className="uppercase h-12 w-full md:w-auto">Copy</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <section role="footer">
        <div className="flex mt-3 text-white space-x-4 text-sm md:text-base flex-wrap">
          <p>© 2023 SHORTIFY</p>
          <div className="space-x-4 font-semibold">
            <Link href="/admin">Admin</Link>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </div>
        </div>
      </section>
    </main>
  )
}
