// app/page.tsx
'use client'

import { useToast } from '@/hooks/use-toast'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import {
  ArrowRight,
  Code,
  Coins,
  Globe,
  Image,
  Repeat,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Feature Box Component
const FeatureBox = ({ icon, text }) => (
  <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg p-3">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
)

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg">
    <div className="text-sand mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-light-gray">{description}</p>
  </div>
)

// Main Component
export default function Home() {
  const { toast } = useToast()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header visible={visible} />
      <MainContent />
      <Footer />
    </div>
  )
}

// Header Component
const Header = ({ visible }) => (
  <header className="container mx-auto px-4 py-6 flex justify-between items-center">
    <img
      src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
      alt="BARK Protocol Logo"
      className="h-10"
    />
    <h1 className="text-2xl font-bold">
      <span
        className={`${
          visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        Blink
      </span>
      Protocol
    </h1>
  </header>
)

// Main Content Component
const MainContent = () => (
  <main className="container mx-auto px-4 py-12">
    <HeroSection />
    <FeaturesSection />
    <AboutSection />
  </main>
)

// Hero Section
const HeroSection = () => (
  <section className="text-center mb-16">
    <h2 className="text-5xl font-bold mb-4">
      Power Your Social Future with BARK Protocol
    </h2>
    <p className="text-xl mb-8 text-light-gray">
      Seamless on-chain interactions for the Solana ecosystem
    </p>
    <Link href="/hub">
      <button
        className="bg-sand hover:bg-dark-gray text-black font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
        aria-label="Get Started with BARK Protocol"
      >
        Get Started
        <ArrowRight className="ml-2" />
      </button>
    </Link>
  </section>
)

// Features Section
const FeaturesSection = () => (
  <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
    {featureData.map(({ icon, title, description }, index) => (
      <FeatureCard key={index} icon={icon} title={title} description={description} />
    ))}
  </section>
)

const featureData = [
  { icon: <Zap size={24} />, title: "Create Blinks", description: "Easily create and share Blinks for various use cases" },
  { icon: <Users size={24} />, title: "Crowdfunding", description: "Launch instant crowdfunding campaigns" },
  { icon: <Coins size={24} />, title: "Donations", description: "Facilitate effortless donations on-chain" },
  { icon: <Image size={24} />, title: "NFT Sales", description: "Streamline NFT sales and marketplace interactions" },
  { icon: <Repeat size={24} />, title: "Token Swaps", description: "Enable quick and easy token swaps" },
  { icon: <Users size={24} />, title: "Social Integration", description: "Enhance social media with on-chain actions" },
]

// About Section
const AboutSection = () => (
  <section className="relative py-20 overflow-hidden bg-dark-gray">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30"></div>
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-white mb-8">About BARK Protocol</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-xl text-light-gray leading-relaxed">
            BARK Protocol is built on Solana's Blink protocol by Dialect,
            transforming complex blockchain operations into user-friendly
            "Blinks". We're making Web3 accessible to everyone in the
            Solana ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {aboutFeatures.map(({ icon, text }, index) => (
              <FeatureBox key={index} icon={icon} text={text} />
            ))}
          </div>
        </div>
        <CommunityJoinSection />
      </div>
    </div>
  </section>
)

const aboutFeatures = [
  { icon: <Zap size={24} />, text: "Lightning-fast Blinks" },
  { icon: <Globe size={24} />, text: "Global Reach" },
  { icon: <Code size={24} />, text: "Simplified Web3" },
  { icon: <Users size={24} />, text: "Community Driven" },
]

// Community Join Section
const CommunityJoinSection = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-sand to-light-gray rounded-full animate-pulse"></div>
    <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
      <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
      <p className="mb-6 text-light-gray">Be part of the future of decentralized social interactions</p>
      <a
        href="https://x.com/send_blink"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-sand hover:bg-dark-gray text-black font-semibold rounded-full transition-colors duration-300"
        aria-label="Follow us on X"
      >
        <TwitterLogoIcon className="mr-2" />
        Follow us on X
      </a>
    </div>
  </div>
)

// Footer Component
const Footer = () => (
  <footer className="bg-black bg-opacity-30 py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h3 className="text-2xl font-bold mb-2">BARK Protocol</h3>
        <p className="text-light-gray">Powered by Solana Blink</p>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <a
          href="https://twitter.com/blink_protocol"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sand hover:text-light-gray transition-colors duration-300"
          aria-label="Follow @bark_protocol on Twitter"
        >
          <TwitterLogoIcon className="mr-1" />
          @bark_protocol
        </a>
      </div>
    </div>
  </footer>
)
